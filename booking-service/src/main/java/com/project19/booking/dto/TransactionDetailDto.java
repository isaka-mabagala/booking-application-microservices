package com.project19.booking.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDetailDto {
  private Long id;

  private String bookingNumber;

  private String cardNumber;

  private String cardType;

  private String paymentMode;

  private String bankName;

  private Double amount;

  private LocalDateTime createdAt;
}
