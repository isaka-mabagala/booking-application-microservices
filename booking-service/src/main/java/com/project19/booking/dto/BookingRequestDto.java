package com.project19.booking.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import org.springframework.format.annotation.NumberFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequestDto {

  @NotEmpty(message = "check in date is required")
  private String checkIn;

  @NotEmpty(message = "check out date is required")
  private String checkOut;

  @NotEmpty(message = "customer number is required")
  private String customerNumber;

  @NotNull(message = "room price is required")
  @NumberFormat
  private Long roomPrice;

  @NotNull(message = "room number is required")
  @NumberFormat
  private Long roomNumber;
}
