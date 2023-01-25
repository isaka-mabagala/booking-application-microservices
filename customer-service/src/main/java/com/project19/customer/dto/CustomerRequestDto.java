package com.project19.customer.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRequestDto {

  @NotEmpty(message = "first name is required")
  private String firstName;

  @NotEmpty(message = "last name is required")
  private String lastName;

  @NotEmpty(message = "email is required")
  @Email()
  private String email;

  @NotEmpty(message = "password is required")
  private String password;
}
