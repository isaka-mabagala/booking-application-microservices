package com.project19.review.exception;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import com.project19.review.error.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

  @ExceptionHandler({MethodArgumentNotValidException.class})
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  ApiError handleValidationException(MethodArgumentNotValidException exception,
      HttpServletRequest request) {
    ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST.value(), "validation error");

    BindingResult result = exception.getBindingResult();
    Map<String, String> validationErrors = new HashMap<>();

    for (FieldError fieldError : result.getFieldErrors()) {
      validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
    }
    apiError.setValidationErrors(validationErrors);

    return apiError;
  }

}
