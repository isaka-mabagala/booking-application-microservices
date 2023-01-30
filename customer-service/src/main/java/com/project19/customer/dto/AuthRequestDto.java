package com.project19.customer.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequestDto {

  @NotEmpty(message = "email is required")
  @Email()
  private String email;

  @NotEmpty(message = "password is required")
  private String password;
}
