package com.project19.notification.error;

import java.util.Map;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(value = Include.NON_NULL)
public class ApiError {

  private int status;

  private String message;

  private Map<String, String> validationErrors;

  public ApiError(int status, String message) {
    super();

    this.status = status;
    this.message = message;
  }

}
