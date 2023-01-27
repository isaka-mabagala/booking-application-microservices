package com.project19.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingEmailDto {
  private String to;

  private String from;

  private String customerName;

  private String roomNo;

  private String expectDate;

  private String checkIn;

  private String checkOut;
}
