package com.project19.booking.controller;

import javax.validation.Valid;
import com.project19.booking.dto.BookingRequestDto;
import com.project19.booking.message.ResponseMessage;
import com.project19.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BookingController {

  @Autowired
  private BookingService bookingService;

  @PostMapping("/booking")
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseMessage roomBooking(@Valid @RequestBody BookingRequestDto bookingRequest) {
    return bookingService.roomBooking(bookingRequest);
  }
}
