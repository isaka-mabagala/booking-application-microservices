package com.project19.review.service;

import java.util.List;
import com.project19.review.dto.CustomerResponseDto;
import com.project19.review.dto.ReviewRequestDto;
import com.project19.review.dto.ReviewResponseDto;
import com.project19.review.message.ResponseMessage;
import com.project19.review.model.ReviewModel;
import com.project19.review.repository.ReviewRepository;
import com.project19.review.util.JwtToken;
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

  @Autowired
  private JwtToken jwtService;

  public ResponseMessage createReview(ReviewRequestDto reviewRequest) {
    // check if customer has ever booked from booking service
    Boolean isBooked = isCustomerBooked(reviewRequest.getCustomerNumber());
    if (!isBooked) {
      throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,
          "customer must booked before write a review");
    }

    // get customer details from customer service
    CustomerResponseDto customer = getCustomerDetail(reviewRequest.getCustomerNumber());

    // save review detail
    ReviewModel review = new ReviewModel();
    review.setTitle(reviewRequest.getTitle());
    review.setDescription(reviewRequest.getDescription());
    review.setRate(reviewRequest.getRate());
    review.setCustomerNumber(customer.getCustNumber());
    review.setEmail(customer.getEmail());
    review.setFullname(customer.getFirstName() + " " + customer.getLastName());

    try {
      reviewRepository.insert(review);
    } catch (DataIntegrityViolationException e) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "customer review already exists");
    }

    return new ResponseMessage("success");
  }

  public ResponseMessage updateReview(ReviewRequestDto reviewRequest) {
    // save review detail
    ReviewModel review = reviewRepository.findByCustomerNumber(reviewRequest.getCustomerNumber())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
            String.format("cannot find review by customer number %s",
                reviewRequest.getCustomerNumber())));

    review.setTitle(reviewRequest.getTitle());
    review.setDescription(reviewRequest.getDescription());
    review.setRate(reviewRequest.getRate());

    try {
      reviewRepository.save(review);
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
      String token = jwtService.token("review@project19.co.tz");
      String uri = env.getProperty("application.service.customer.url", "http://127.0.0.1:8080");
      CustomerResponseDto customer = webClient.get()
          .uri(String.format("%s/api/customer?number=%s", uri, customerNumber))
          .headers(h -> h.setBearerAuth(token))
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

  private Boolean isCustomerBooked(String customerNumber) {
    // check if customer has ever booked from booking service
    try {
      String token = jwtService.token("review@project19.co.tz");
      String uri = env.getProperty("application.service.booking.url", "http://127.0.0.1:8081");
      return webClient.get()
          .uri(String.format("%s/api/customer-booked/%s", uri, customerNumber))
          .headers(h -> h.setBearerAuth(token))
          .retrieve().bodyToMono(Boolean.class)
          .block();
    } catch (WebClientResponseException we) {
      throw new ResponseStatusException(we.getStatusCode());
    }
  }
}
