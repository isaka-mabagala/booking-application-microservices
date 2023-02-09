package com.project19.booking.repository;

import java.util.List;
import java.util.Optional;
import com.project19.booking.model.BookingModel;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookingRepository extends MongoRepository<BookingModel, String> {

  Optional<BookingModel> findByBookingNumber(String bookingNumber);

  @Aggregation(pipeline = {
      "{$match: {customerNumber: ?0}}",
      "{$sort: {_id: -1}}"
  })
  List<BookingModel> findByCustomerNumber(String customerNumber);
}
