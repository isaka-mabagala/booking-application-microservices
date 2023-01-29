package com.project19.review.service;

import java.util.List;
import com.project19.review.dto.CustomerResponseDto;
import com.project19.review.dto.ReviewRequestDto;
import com.project19.review.dto.ReviewResponseDto;
import com.project19.review.message.ResponseMessage;
import com.project19.review.model.ReviewModel;
import com.project19.review.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ReviewService {

  @Autowired
  private ReviewRepository reviewRepository;

  @Autowired
  private WebClient webClient;

  @Autowired
  private Environment env;

  public ResponseMessage createReview(ReviewRequestDto reviewRequest) {
    // get customer details from customer service
    CustomerResponseDto customer = getCustomerDetail(reviewRequest.getCustomerNumber());

    // save review detail
    ReviewModel review = new ReviewModel();
    review.setTitle(reviewRequest.getTitle());
    review.setDescription(reviewRequest.getDescription());
    review.setRate(reviewRequest.getRate());
    review.setCustomerNumber(customer.getCustNumber());
    review.setFullname(customer.getFirstName() + " " + customer.getLastName());

    try {
      reviewRepository.insert(review);
    } catch (DataIntegrityViolationException e) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "customer review already exists");
    }

    return new ResponseMessage("success");
  }

  public ReviewResponseDto getReviewByCustomerNumber(String customerNumber) {
    ReviewModel review = reviewRepository.findByCustomerNumber(customerNumber).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
            String.format("cannot find review by customer number %s", customerNumber)));

    return new ReviewResponseDto(review);
  }

  public List<ReviewResponseDto> getReviews() {
    List<ReviewModel> reviews = reviewRepository.findAll();

    return reviews.stream().map(review -> new ReviewResponseDto(review)).toList();
  }

  private CustomerResponseDto getCustomerDetail(String customerNumber) {
    // get customer details from customer service
    try {
      String uri = env.getProperty("application.service.customer.url", "http://127.0.0.1:8080");
      CustomerResponseDto customer = webClient.get()
          .uri(String.format("%s/api/customer?number=%s", uri, customerNumber))
          .retrieve().bodyToMono(CustomerResponseDto.class)
          .block();
      return customer;
    } catch (WebClientResponseException we) {
      if (we.getRawStatusCode() == 404) {
        throw new ResponseStatusException(we.getStatusCode(), "customer not found");
      }
      throw new ResponseStatusException(we.getStatusCode());
    }
  }
}
