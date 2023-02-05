import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-booking-room',
  templateUrl: './booking-room.component.html',
  styleUrls: ['./booking-room.component.css'],
})
export class BookingRoomComponent implements OnInit {
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookingForm = fb.group({
      roomNumber: new FormControl('', [Validators.required]),
      checkIn: new FormControl('', [Validators.required]),
      checkOut: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submitBookingForm(): void {
    if (this.bookingForm.valid) {
      console.log(this.bookingForm.value);
    }
  }
}
