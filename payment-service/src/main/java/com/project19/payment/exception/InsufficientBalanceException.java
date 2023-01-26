package com.project19.payment.exception;

public class InsufficientBalanceException extends RuntimeException {
  public InsufficientBalanceException() {
    super("insufficient balance in account");
  }
}
