package com.project19.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDto {

  private String paymentMode;

  private String bookingNumber;

  private String cardNumber;

  private String cardExpiry;

  private String cardCvc;

  private Double amount;
}
