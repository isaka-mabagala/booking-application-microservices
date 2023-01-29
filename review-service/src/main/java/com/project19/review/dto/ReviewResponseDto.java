package com.project19.review.dto;

import java.util.Date;
import com.project19.review.model.ReviewModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponseDto {

  private String customerNumber;

  private String fullname;

  private String title;

  private String description;

  private Double rate;

  private Date createdDate;

  public ReviewResponseDto(ReviewModel review) {
    customerNumber = review.getCustomerNumber();
    fullname = review.getFullname();
    title = review.getTitle();
    description = review.getDescription();
    rate = review.getRate();
    createdDate = review.getCreatedDate();
  }
}
