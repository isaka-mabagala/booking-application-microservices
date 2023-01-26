package com.project19.booking.dto;

import com.project19.booking.model.BookingModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponseDto {

  private String bookingNumber;

  private String customerNumber;

  private Long roomNumber;

  private Long roomPrice;

  private String checkIn;

  private String checkOut;

  private String bookedOn;

  private String status;

  private Long transactionId;

  public BookingResponseDto(BookingModel booking) {
    bookingNumber = booking.getBookingNumber();
    customerNumber = booking.getCustomerNumber();
    roomNumber = booking.getRoomNumber();
    roomPrice = booking.getRoomPrice();
    checkIn = booking.getCheckIn();
    checkOut = booking.getCheckOut();
    bookedOn = booking.getBookedOn();
    status = booking.getStatus();
    transactionId = booking.getTransactionId();
  }
}
