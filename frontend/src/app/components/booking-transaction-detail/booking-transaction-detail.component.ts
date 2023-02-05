import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-transaction-detail',
  templateUrl: './booking-transaction-detail.component.html',
  styleUrls: ['./booking-transaction-detail.component.css'],
})
export class BookingTransactionDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit(): void {
    this.viewTransactionDetail();
  }

  viewTransactionDetail(): void {
    if (this.data) {
      console.log('data binding:', this.data);
    }
  }
}
