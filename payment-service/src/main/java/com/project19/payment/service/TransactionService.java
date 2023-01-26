package com.project19.payment.service;

import com.project19.payment.dto.TransactionRequestDto;
import com.project19.payment.dto.TransactionResponseDto;
import com.project19.payment.model.TransactionModel;
import com.project19.payment.repository.TransactionRepository;
import com.project19.payment.util.PaymentGatewaySimulator;
import com.project19.payment.util.PaymentGatewaySimulator.CardRequest;
import com.project19.payment.util.PaymentGatewaySimulator.PaymentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TransactionService {

  @Autowired
  private TransactionRepository transactionRepository;

  @Transactional
  public TransactionResponseDto cardTransaction(TransactionRequestDto transactionRDto) {
    try {
      TransactionModel transaction = new TransactionModel();
      transaction.setPaymentMode(transactionRDto.getPaymentMode());
      transaction.setCardNumber(transactionRDto.getCardNumber());
      transaction.setBookingNumber(transactionRDto.getBookingNumber());
      transaction.setAmount(transactionRDto.getAmount());

      TransactionModel savedTransaction = transactionRepository.save(transaction);

      // simulate transaction failure due to insufficient balance in account
      CardRequest cardRequest = new CardRequest(
          transactionRDto.getCardNumber(), transactionRDto.getCardExpiry(),
          transactionRDto.getCardCvc(), transactionRDto.getAmount());
      PaymentResponse payment = PaymentGatewaySimulator.validateAccBalance(cardRequest);

      transaction.setCardType(payment.cardType());
      transaction.setBankName(payment.bankName());

      savedTransaction = transactionRepository.save(transaction);

      TransactionResponseDto response = new TransactionResponseDto();
      response.setTransactionId(savedTransaction.getId());

      return response;
    } catch (DataIntegrityViolationException ex) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "booking number transaction paid");
    }
  }
}
