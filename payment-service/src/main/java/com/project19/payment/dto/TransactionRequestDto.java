package com.project19.payment.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import org.springframework.format.annotation.NumberFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequestDto {

  @NotEmpty(message = "payment mode is required")
  private String paymentMode;

  @NotEmpty(message = "booking number is required")
  private String bookingNumber;

  @NotEmpty(message = "card number is required")
  private String cardNumber;

  @NotEmpty(message = "card expiration date is required")
  private String cardExpiry;

  @NotEmpty(message = "card CVC is required")
  private String cardCvc;

  @NotNull(message = "amount is required")
  @NumberFormat
  private Double amount;
}
