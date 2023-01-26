package com.project19.booking.type;

public enum BookingStatus {
  BOOKED("BOOKED"), NOT_BOOKED("NOT BOOKED");

  public final String status;

  private BookingStatus(String status) {
    this.status = status;
  }
}
