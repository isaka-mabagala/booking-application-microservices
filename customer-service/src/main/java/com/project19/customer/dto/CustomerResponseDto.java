package com.project19.customer.dto;

import com.project19.customer.model.CustomerModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponseDto {

  private String custNumber;

  private String firstName;

  private String lastName;

  private String email;

  public CustomerResponseDto(CustomerModel customer) {
    custNumber = customer.getCustNumber();
    firstName = customer.getFirstName();
    lastName = customer.getLastName();
    email = customer.getEmail();
  }
}
