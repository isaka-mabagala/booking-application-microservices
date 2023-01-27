package com.project19.notification.controller;

import java.util.HashMap;
import java.util.Map;
import javax.validation.Valid;
import com.project19.notification.model.TransactionEmail;
import com.project19.notification.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class EmailSenderController {
  @Autowired
  private EmailSenderService emailSenderService;

  record MailResponse(String message) {
  }

  @PostMapping("/mail/transaction-message")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public MailResponse simpleMessage(@Valid @RequestBody TransactionEmail emailRequest) {
    String fromEmail = emailRequest.getFrom();
    String toEmail = emailRequest.getTo();

    Map<String, Object> properties = new HashMap<>();
    properties.put("customerName", emailRequest.getCustomerName());
    properties.put("paidDate", emailRequest.getPaidDate());
    properties.put("cardType", emailRequest.getCardType());
    properties.put("cardNo", emailRequest.getCardNo());
    properties.put("amount", emailRequest.getAmount());

    emailSenderService.sendTransactionMessage(fromEmail, toEmail, properties);

    return new MailResponse("success");
  }
}
