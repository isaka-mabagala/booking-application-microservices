package com.project19.booking.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.TimeZone;
import com.project19.booking.dto.BookingRequestDto;
import com.project19.booking.message.ResponseMessage;
import com.project19.booking.model.BookingModel;
import com.project19.booking.repository.BookingRepository;
import com.project19.booking.type.BookingStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BookingService {

  @Autowired
  private BookingRepository bookingRepository;

  public ResponseMessage roomBooking(BookingRequestDto bookingRequest) {
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

    return new ResponseMessage("booking success");
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
