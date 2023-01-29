package com.project19.review.model;

import java.util.Date;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("reviews")
public class ReviewModel {
  @Id
  private String id;

  @Indexed(unique = true)
  @Field
  private String customerNumber;

  @Field
  private String fullname;

  @Field
  private String title;

  @Field
  private String description;

  @Field
  private Double rate;

  @Field
  @CreatedDate
  private Date createdDate;
}
