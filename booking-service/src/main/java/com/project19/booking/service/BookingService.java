package com.project19.booking.service;

import java.text.DateFormat;
import java.text.FieldPosition;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.TimeZone;
import com.project19.booking.dto.BookingEmailDto;
import com.project19.booking.dto.BookingRequestDto;
import com.project19.booking.dto.BookingResponseDto;
import com.project19.booking.dto.BookingTransactionRequestDto;
import com.project19.booking.dto.CustomerResponseDto;
import com.project19.booking.dto.TransactionDetailDto;
import com.project19.booking.dto.TransactionDto;
import com.project19.booking.dto.TransactionEmailDto;
import com.project19.booking.dto.TransactionResponseDto;
import com.project19.booking.message.ResponseMessage;
import com.project19.booking.model.BookingModel;
import com.project19.booking.repository.BookingRepository;
import com.project19.booking.type.BookingStatus;
import com.project19.booking.util.JwtToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BookingService {

  @Autowired
  private BookingRepository bookingRepository;

  @Autowired
  private WebClient webClient;

  @Autowired
  private Environment env;

  @Autowired
  private JwtToken jwtService;

  public ResponseMessage roomBooking(BookingRequestDto bookingRequest) {
    // get customer details from customer service
    CustomerResponseDto customer = getCustomerDetail(bookingRequest.getCustomerNumber());

    // make customer booking
    TimeZone tz = TimeZone.getTimeZone("UTC");
    DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'");
    df.setTimeZone(tz);

    BookingModel booking = new BookingModel();
    booking.setRoomNumber(bookingRequest.getRoomNumber());
    booking.setCheckIn(bookingRequest.getCheckIn());
    booking.setCheckOut(bookingRequest.getCheckOut());
    booking.setCustomerNumber(bookingRequest.getCustomerNumber());
    booking.setRoomPrice(bookingRequest.getRoomPrice());
    booking.setBookingNumber(randomBookingNumber(10));
    booking.setBookedOn(df.format(new Date()));
    booking.setStatus(BookingStatus.NOT_BOOKED.status);

    try {
      bookingRepository.insert(booking);
    } catch (DataIntegrityViolationException e) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "booking number already exists");
    }

    // send booking email request to notification service
    try {
      SimpleDateFormat newDate = new SimpleDateFormat("dd/MM/yyyy");
      SimpleDateFormat formatter = new SimpleDateFormat("EEE, d MMM yyyy");
      BookingEmailDto bookingEmail = new BookingEmailDto();
      Date checkIn = newDate.parse(booking.getCheckIn());
      Date checkOut = newDate.parse(booking.getCheckOut());

      bookingEmail.setFrom("server@localhost.com");
      bookingEmail.setTo(customer.getEmail());
      bookingEmail.setCustomerName(customer.getFirstName() + " " + customer.getLastName());
      bookingEmail.setRoomNo(booking.getRoomNumber().toString());
      bookingEmail.setExpectDate(formatter.format(checkIn));
      bookingEmail.setCheckIn(formatter.format(checkIn));
      bookingEmail.setCheckOut(formatter.format(checkOut));

      String token = jwtService.token("booking@project19.co.tz");
      String uri = env.getProperty("application.service.notification.url", "http://127.0.0.1:8082");
      webClient.post()
          .uri(String.format("%s/api/mail/booking-message", uri))
          .headers(h -> h.setBearerAuth(token))
          .body(BodyInserters.fromValue(bookingEmail))
          .retrieve().bodyToMono(String.class)
          .block();
    } catch (WebClientResponseException | ParseException ex) {
      throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, ex.getMessage());
    }

    return new ResponseMessage("booking success");
  }

  public BookingResponseDto getBookingByNumber(String bookingNumber) {
    BookingModel booking = bookingRepository.findByBookingNumber(
        bookingNumber).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                String.format("cannot find booking by number %s", bookingNumber)));

    return new BookingResponseDto(booking);
  }

  public List<BookingResponseDto> getBookingByCustomerNumber(String customerNumber) {
    List<BookingModel> bookings = bookingRepository.findByCustomerNumber(customerNumber);

    return bookings.stream().map(booking -> new BookingResponseDto(booking)).toList();
  }

  public Boolean isCustomerBooked(String customerNumber) {
    List<BookingModel> bookings = bookingRepository.findByCustomerNumber(customerNumber);

    for (BookingModel booking : bookings) {
      if (booking.getStatus().equals(BookingStatus.BOOKED.name())) {
        return true;
      }
    }

    return false;
  }

  public BookingResponseDto bookingTransaction(BookingTransactionRequestDto bookingTransaction) {
    // check if booking number exists in DB
    BookingModel booking = bookingRepository.findByBookingNumber(
        bookingTransaction.getBookingNumber()).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                String.format("cannot find booking by number %s",
                    bookingTransaction.getBookingNumber())));

    TransactionDto transaction = new TransactionDto();
    transaction.setBookingNumber(bookingTransaction.getBookingNumber());
    transaction.setCardNumber(bookingTransaction.getCardNumber());
    transaction.setCardExpiry(bookingTransaction.getCardExpiry());
    transaction.setCardCvc(bookingTransaction.getCardCvc());
    transaction.setAmount(Double.parseDouble(booking.getRoomPrice().toString()));
    transaction.setPaymentMode("CARD");

    // send transaction request to payment service
    try {
      String token = jwtService.token("booking@project19.co.tz");
      String uri = env.getProperty("application.service.payment.url", "http://127.0.0.1:8083");
      TransactionResponseDto response = webClient.post()
          .uri(String.format("%s/api/transaction", uri))
          .headers(h -> h.setBearerAuth(token))
          .body(BodyInserters.fromValue(transaction))
          .retrieve().bodyToMono(TransactionResponseDto.class)
          .block();

      // update booking details
      booking.setStatus(BookingStatus.BOOKED.status);
      booking.setTransactionId(response.getTransactionId());
      bookingRepository.save(booking);
    } catch (WebClientResponseException we) {
      if (we.getRawStatusCode() == 409) {
        throw new ResponseStatusException(we.getStatusCode(), "booking number transaction paid");
      } else if (we.getRawStatusCode() == 406) {
        throw new ResponseStatusException(we.getStatusCode(),
            "invalid card details or insufficient balance");
      }
      throw new ResponseStatusException(we.getStatusCode());
    }

    // get customer details from customer service
    CustomerResponseDto customer = getCustomerDetail(booking.getCustomerNumber());

    // get transaction details from payment service
    TransactionDetailDto transactionDetail = getTransactionDetail(booking.getTransactionId());

    // send transaction email request to notification service
    try {
      SimpleDateFormat formatter = new SimpleDateFormat("EEE, d MMM yyyy hh:mm aaa");
      NumberFormat numberFormat = NumberFormat.getInstance(Locale.US);
      TransactionEmailDto transactionEmail = new TransactionEmailDto();
      String cardNumber = transactionDetail.getCardNumber();
      Double bookingAmount = transactionDetail.getAmount();
      Date paidDate = Date.from(
          transactionDetail.getCreatedAt().atZone(ZoneId.systemDefault()).toInstant());

      StringBuffer amountSb = new StringBuffer();
      numberFormat.format(bookingAmount, amountSb, new FieldPosition(0));

      transactionEmail.setCustomerName(customer.getFirstName() + " " + customer.getLastName());
      transactionEmail.setFrom("server@localhost.com");
      transactionEmail.setTo(customer.getEmail());
      transactionEmail.setPaidDate(formatter.format(paidDate));
      transactionEmail.setAmount(amountSb.toString());
      transactionEmail.setCardNo("*****" + cardNumber.substring(cardNumber.length() - 4));
      transactionEmail.setCardType(transactionDetail.getCardType());

      String token = jwtService.token("booking@project19.co.tz");
      String uri = env.getProperty("application.service.notification.url", "http://127.0.0.1:8082");
      webClient.post()
          .uri(String.format("%s/api/mail/transaction-message", uri))
          .headers(h -> h.setBearerAuth(token))
          .body(BodyInserters.fromValue(transactionEmail))
          .retrieve().bodyToMono(String.class)
          .block();
    } catch (WebClientResponseException we) {
      throw new ResponseStatusException(we.getStatusCode());
    }

    return new BookingResponseDto(booking);
  }

  private CustomerResponseDto getCustomerDetail(String customerNumber) {
    // get customer details from customer service
    try {
      String token = jwtService.token("booking@project19.co.tz");
      String uri = env.getProperty("application.service.customer.url", "http://127.0.0.1:8080");
      CustomerResponseDto customer = webClient.get()
          .uri(String.format("%s/api/customer?number=%s", uri, customerNumber))
          .headers(h -> h.setBearerAuth(token))
          .retrieve().bodyToMono(CustomerResponseDto.class)
          .block();
      return customer;
    } catch (WebClientResponseException we) {
      if (we.getRawStatusCode() == 404) {
        throw new ResponseStatusException(we.getStatusCode(), "customer not found");
      }
      throw new ResponseStatusException(we.getStatusCode());
    }
  }

  private TransactionDetailDto getTransactionDetail(Long id) {
    // get transaction details from payment service
    try {
      String token = jwtService.token("booking@project19.co.tz");
      String uri = env.getProperty("application.service.payment.url", "http://127.0.0.1:8083");
      TransactionDetailDto response = webClient.get()
          .uri(String.format("%s/api/transaction/%s", uri, id))
          .headers(h -> h.setBearerAuth(token))
          .retrieve().bodyToMono(TransactionDetailDto.class)
          .block();

      return response;
    } catch (WebClientResponseException we) {
      if (we.getRawStatusCode() == 404) {
        throw new ResponseStatusException(we.getStatusCode(), "booking transaction not found");
      }
      throw new ResponseStatusException(we.getStatusCode());
    }
  }

  private String randomBookingNumber(int len) {
    String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxyz";
    Random rnd = new Random();
    StringBuilder sb = new StringBuilder(len);

    for (int i = 0; i < len; i++) {
      sb.append(chars.charAt(rnd.nextInt(chars.length())));
    }

    return sb.toString();
  }
}
