package com.project19.review.controller;

import java.util.List;
import javax.validation.Valid;
import com.project19.review.dto.ReviewRequestDto;
import com.project19.review.dto.ReviewResponseDto;
import com.project19.review.message.ResponseMessage;
import com.project19.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ReviewController {

  @Autowired
  private ReviewService reviewService;

  @PostMapping("/review/create")
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseMessage createReview(@Valid @RequestBody ReviewRequestDto reviewRequest) {
    return reviewService.createReview(reviewRequest);
  }

  @GetMapping("/review/customer/{number}")
  @ResponseStatus(HttpStatus.OK)
  public ReviewResponseDto getReviewDetail(@PathVariable String number) {
    return reviewService.getReviewByCustomerNumber(number);
  }

  @GetMapping("/reviews")
  @ResponseStatus(HttpStatus.OK)
  public List<ReviewResponseDto> getReviewsDetail() {
    return reviewService.getReviews();
  }
}
