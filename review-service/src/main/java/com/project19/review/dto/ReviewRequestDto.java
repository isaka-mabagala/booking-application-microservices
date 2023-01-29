package com.project19.review.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import org.springframework.format.annotation.NumberFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequestDto {

  @NotEmpty(message = "review title is required")
  private String title;

  @NotEmpty(message = "review description is required")
  private String description;

  @NotNull(message = "review rate is required")
  @NumberFormat
  private Double rate;

  @NotEmpty(message = "customer number is required")
  private String customerNumber;
}
