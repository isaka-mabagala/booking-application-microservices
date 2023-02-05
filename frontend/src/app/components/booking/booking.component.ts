import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingTable } from 'src/app/models/booking-table';
import { BookingRoomComponent } from '../booking-room/booking-room.component';
import { BookingTransactionDetailComponent } from '../booking-transaction-detail/booking-transaction-detail.component';
import { BookingTransactionComponent } from '../booking-transaction/booking-transaction.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookingTableColumns: string[] = [
    'position',
    'bookingNumber',
    'roomNumber',
    'price',
    'checkIn',
    'checkOut',
    'bookedOn',
    'status',
    'transactionButton',
  ];

  bookingTableData: BookingTable[] = [
    {
      position: 1,
      bookingNumber: 'Ah6jqy1jKr',
      roomNumber: 301,
      price: '45,000',
      checkIn: '31/01/2023',
      checkOut: '02/02/2023',
      bookedOn: '2023-01-27',
      status: 'NOT BOOKED',
      transactionId: null,
    },
    {
      position: 2,
      bookingNumber: 'Au6cqy1jKk',
      roomNumber: 207,
      price: '45,000',
      checkIn: '12/01/2023',
      checkOut: '14/01/2023',
      bookedOn: '2023-01-10',
      status: 'BOOKED',
      transactionId: 15,
    },
    {
      position: 3,
      bookingNumber: 'Hu6cpy4jLk',
      roomNumber: 207,
      price: '45,000',
      checkIn: '12/11/2022',
      checkOut: '14/11/2022',
      bookedOn: '2022-11-10',
      status: 'BOOKED',
      transactionId: 10,
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  viewBookingTransactionDialog(transactionId: number): void {
    const dialogRef = this.dialog.open(BookingTransactionDetailComponent, {
      width: '500px',
      data: { transactionId },
    });
  }

  bookingTransactionDialog(bookingNumber: string): void {
    const dialogRef = this.dialog.open(BookingTransactionComponent, {
      disableClose: true,
      autoFocus: true,
      width: '500px',
      data: { bookingNumber },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addBookingDialog(): void {
    const dialogRef = this.dialog.open(BookingRoomComponent, {
      disableClose: true,
      autoFocus: true,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
