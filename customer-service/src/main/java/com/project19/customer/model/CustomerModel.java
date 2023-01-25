package com.project19.customer.model;

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
@Document("customer")
public class CustomerModel {
  @Id
  private String id;

  @Indexed(unique = true)
  @Field
  private String custNumber;

  @Field
  private String firstName;

  @Field
  private String lastName;

  @Indexed(unique = true)
  @Field
  private String email;

  @Field()
  private String password;
}
