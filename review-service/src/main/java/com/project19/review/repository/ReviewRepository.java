package com.project19.review.repository;

import java.util.Optional;
import com.project19.review.model.ReviewModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository extends MongoRepository<ReviewModel, String> {

  Optional<ReviewModel> findByCustomerNumber(String customerNumber);
}
