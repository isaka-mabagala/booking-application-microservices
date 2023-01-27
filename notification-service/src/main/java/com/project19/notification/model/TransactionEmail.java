package com.project19.notification.model;

import javax.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionEmail {
  @NotEmpty(message = "to email is required")
  private String to;

  @NotEmpty(message = "from email is required")
  private String from;

  @NotEmpty(message = "customer name is required")
  private String customerName;

  @NotEmpty(message = "paid date is required")
  private String paidDate;

  @NotEmpty(message = "card type is required")
  private String cardType;

  @NotEmpty(message = "card number is required")
  private String cardNo;

  @NotEmpty(message = "amount is required")
  private String amount;
}
