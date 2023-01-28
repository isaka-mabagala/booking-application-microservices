package com.project19.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionEmailDto {
  private String to;

  private String from;

  private String customerName;

  private String paidDate;

  private String cardType;

  private String cardNo;

  private String amount;
}
