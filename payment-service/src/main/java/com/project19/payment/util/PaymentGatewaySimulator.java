package com.project19.payment.util;

import java.util.ArrayList;
import java.util.List;
import com.project19.payment.exception.InsufficientBalanceException;
import com.project19.payment.exception.InvalidCardDetailException;

public class PaymentGatewaySimulator {
  public record CardDetail(String number, String expiry, String cvc, String type, String bank,
      Double balance) {
  }

  public record CardRequest(String number, String expiry, String cvc, Double amount) {
  }

  public record PaymentResponse(String cardNumber, String cardType, String bankName) {
  }

  private static List<CardDetail> accounts = new ArrayList<CardDetail>();

  static {
    accounts.add(
        new CardDetail("5161 4800 0276 4486", "09/23", "175", "MASTERCARD", "NMB", 75000.00));
    accounts.add(
        new CardDetail("4107 7342 3815 8180", "11/23", "186", "VISA", "CRDB", 55000.00));
  }

  public static PaymentResponse validateAccBalance(CardRequest cardRequest) {
    CardDetail account = accounts.stream()
        .filter(acc -> acc.number.contentEquals(cardRequest.number)
            && acc.expiry.contentEquals(cardRequest.expiry)
            && acc.cvc.contentEquals(cardRequest.cvc))
        .findFirst().orElseThrow(() -> new InvalidCardDetailException());

    // check if remain account balance is not less than TZS 5000
    if ((account.balance - cardRequest.amount) < 5000) {
      throw new InsufficientBalanceException();
    }

    return new PaymentResponse(account.number(), account.type(), account.bank());
  }
}
