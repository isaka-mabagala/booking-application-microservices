# Microservice Project (Assignment CSS 311)
![Transaction](meta/transaction.png?raw=true)

A microservice architecture based (hotel room) booking application with Spring Boot Framework (backend) and Angular 13 Framework (frontend). This assignment provided by Mr. Lunodzo Mwinuka to Bachelor of Science in Information Technology and Systems (BSc.ITS) and Bachelor of Science in ICT with Management (BSc.ICT-M) students for Distributed Systems (CSS 311) course at Mzumbe University Morogoro, Tanzania.

### Application Details
- Authentication between services communication used `JWT`

- Email notification tool `MailHog`

- Databases used `MongoDB` and `H2`

- Default booking room price `45000`

- Cards detail for booking transactions
  | Card Number            | Expiry Date  | CVC  | Balance  |
  |:-----------------------|:-------------|:-----|:---------|
  | 5161 4800 0276 4486    | 09/23        | 175  | 75000.00 |
  | 4107 7342 3815 8180    | 11/23        | 186  | 55000.00 |

### Application Configurations
- Java `17` or later installed
- Node `14` or later installed
- MongoDB installed
- Create database and connect in `application.properties` file
- MailHog email testing tool

### Start using application
- Create an account
- Login to account
- Make booking
- Make booking transaction
- Write a review

## High Level Architecture
The application consists of the following five (5) microservices:

| API url                  | Service
|:-------------------------|:---------------
| http://127.0.0.1:8080    | Customer Service
| http://127.0.0.1:8081    | Booking Service
| http://127.0.0.1:8082    | Notification Service
| http://127.0.0.1:8083    | Payment Service
| http://127.0.0.1:8084    | Review Service

#### Architecture Diagram - 
![Architecture Diagram](meta/architecture-diagram.jpg?raw=true)

## Logic Flow
### Making a new booking -
![Booking Flow](meta/booking-flow.jpg?raw=true)

### Making booking transaction -
![Booking Transaction Flow](meta/booking-transaction-flow.jpg?raw=true)

### Write a review -
![Write Review Flow](meta/write-review-flow.jpg?raw=true)

## Future Enhancements
1. Provide single start-up script to bring up all the services
2. Implement API gateway and load balancer

## Screenshots
![Register](meta/register.png?raw=true)

![Login](meta/login.png?raw=true)

![Booking](meta/booking.png?raw=true)

![Booking Email](meta/booking-email.png?raw=true)

![Transaction](meta/transaction.png?raw=true)

![Transaction Email](meta/transaction-email.png?raw=true)

![Transaction Success](meta/transaction-success.png?raw=true)

![Reviews](meta/reviews.png?raw=true)

![Write Review](meta/write-review.png?raw=true)
