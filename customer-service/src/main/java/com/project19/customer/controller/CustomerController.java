package com.project19.customer.controller;

import javax.validation.Valid;
import com.project19.customer.dto.CustomerRequestDto;
import com.project19.customer.message.ResponseMessage;
import com.project19.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CustomerController {

  @Autowired
  private CustomerService customerService;

  @PostMapping("/customer/register")
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseMessage customerRegister(@Valid @RequestBody CustomerRequestDto customerRequest) {
    return customerService.customerRegister(customerRequest);
  }
}
