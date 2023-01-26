package com.project19.payment.controller;

import javax.validation.Valid;
import com.project19.payment.dto.TransactionRequestDto;
import com.project19.payment.dto.TransactionResponseDto;
import com.project19.payment.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TransactionController {

  @Autowired
  private TransactionService transactionService;

  @PostMapping("/transaction")
  @ResponseStatus(HttpStatus.CREATED)
  public TransactionResponseDto cardTransaction(
      @Valid @RequestBody TransactionRequestDto transactionRDto) {
    return transactionService.cardTransaction(transactionRDto);
  }
}
