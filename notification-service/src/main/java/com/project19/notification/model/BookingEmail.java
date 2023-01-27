package com.project19.notification.model;

import javax.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingEmail {
  @NotEmpty(message = "to email is required")
  private String to;

  @NotEmpty(message = "from email is required")
  private String from;

  @NotEmpty(message = "customer name is required")
  private String customerName;

  @NotEmpty(message = "room number is required")
  private String roomNo;

  @NotEmpty(message = "expecting date is required")
  private String expectDate;

  @NotEmpty(message = "check-in date is required")
  private String checkIn;

  @NotEmpty(message = "check-out date is required")
  private String checkOut;
}
