import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookingCreate } from 'src/app/models/customer-api';
import { Customer } from 'src/app/models/microservice';
import { MicroserviceStore } from 'src/app/store/microservice.store';
import { environment as env } from '../../../environments/environment';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-booking-room',
  templateUrl: './booking-room.component.html',
  styleUrls: ['./booking-room.component.css'],
})
export class BookingRoomComponent implements OnInit {
  bookingForm: FormGroup;
  customer: Customer | null = null;
  submitFormProgress: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<BookingRoomComponent>,
    private fb: FormBuilder,
    private apiDataService: ApiDataService,
    private microserviceStore: MicroserviceStore
  ) {
    this.bookingForm = fb.group({
      roomNumber: new FormControl('', [Validators.required]),
      checkIn: new FormControl('', [Validators.required]),
      checkOut: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.microserviceStore.user$.subscribe((res) => {
      this.customer = res;
    });
  }

  async submitBookingForm(): Promise<void> {
    if (this.bookingForm.valid) {
      this.submitFormProgress = true;
      const formDetail = this.bookingForm.value;

      const bookingDetail: BookingCreate = {
        customerNumber: this.customer!.custNumber,
        roomPrice: env.roomPrice,
        roomNumber: Number(formDetail.roomNumber),
        checkIn: formDetail.checkIn.format('dd/mm/yyyy'),
        checkOut: formDetail.checkOut.format('dd/mm/yyyy'),
      };

      const submitDetail = await this.apiDataService.bookingCreate(
        bookingDetail
      );
      submitDetail.subscribe(() => {
        this.submitFormProgress = false;
        this.dialogRef.close('success');
      });
    }
  }
}
