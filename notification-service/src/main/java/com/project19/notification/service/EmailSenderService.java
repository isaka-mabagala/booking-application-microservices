package com.project19.notification.service;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import javax.mail.internet.MimeMessage;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

  private final JavaMailSender emailSender;

  private final SpringTemplateEngine templateEngine;

  public void sendTransactionMessage(String fromEmail, String toEmail,
      Map<String, Object> properties) {
    try {
      MimeMessage message = emailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(
          message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
      Context context = new Context();

      context.setVariables(properties);
      helper.setFrom(fromEmail);
      helper.setTo(toEmail);
      helper.setSubject("Payment Confirmation");

      String html = templateEngine.process("transaction-email.html", context);
      helper.setText(html, true);

      emailSender.send(message);
    } catch (Exception ex) {
      throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, ex.getMessage());
    }
  }
}
