package com.project19.booking.repository;

import com.project19.booking.model.BookingModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookingRepository extends MongoRepository<BookingModel, String> {

}
