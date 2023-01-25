package com.project19.customer.repository;

import java.util.Optional;
import com.project19.customer.model.CustomerModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepository extends MongoRepository<CustomerModel, String> {

  Optional<CustomerModel> findByCustNumber(String customerNumber);

  Optional<CustomerModel> findByEmail(String email);
}
