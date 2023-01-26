package com.project19.booking.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Field.Write;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("booking")
public class BookingModel {
  @Id
  private String id;

  @Indexed(unique = true)
  @Field
  private String bookingNumber;

  @Field
  private String customerNumber;

  @Field
  private Long roomNumber;

  @Field
  private Long roomPrice;

  @Field
  private String checkIn;

  @Field
  private String checkOut;

  @Field()
  private String bookedOn;

  @Field()
  private String status;

  @Field(write = Write.ALWAYS)
  private Long transactionId;
}
