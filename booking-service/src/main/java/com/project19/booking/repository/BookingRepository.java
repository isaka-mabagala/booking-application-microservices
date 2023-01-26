package com.project19.booking.repository;

import java.util.List;
import java.util.Optional;
import com.project19.booking.model.BookingModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookingRepository extends MongoRepository<BookingModel, String> {

  Optional<BookingModel> findByBookingNumber(String bookingNumber);

  List<BookingModel> findByCustomerNumber(String customerNumber);
}
