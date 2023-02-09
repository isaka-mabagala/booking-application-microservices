import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { BookingTable } from 'src/app/models/booking-table';
import { MicroserviceStore } from 'src/app/store/microservice.store';
import { ApiDataService } from '../../services/api-data.service';
import { BookingRoomComponent } from '../booking-room/booking-room.component';
import { BookingTransactionDetailComponent } from '../booking-transaction-detail/booking-transaction-detail.component';
import { BookingTransactionComponent } from '../booking-transaction/booking-transaction.component';
declare var $: any;

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

  bookingTableData$: Observable<BookingTable[] | null> = of();

  constructor(
    private dialog: MatDialog,
    private apiDataService: ApiDataService,
    private microserviceStore: MicroserviceStore
  ) {}

  ngOnInit(): void {
    this.getBookingList();
  }

  async getBookingList(): Promise<void> {
    this.microserviceStore.user$.subscribe(async (res) => {
      const custNumber = res.custNumber;
      const bookings = await this.apiDataService.bookingsByCustomer(custNumber);
      let bookingTableData: BookingTable[] | null = null;

      bookings.subscribe((res) => {
        if (res.length) {
          bookingTableData = [];
          res.forEach((booking, index) => {
            bookingTableData?.push({
              position: index + 1,
              bookingNumber: booking.bookingNumber,
              roomNumber: booking.roomNumber,
              price: booking.roomPrice.toString(),
              checkIn: booking.checkIn,
              checkOut: booking.checkOut,
              bookedOn: booking.bookedOn,
              status: booking.status,
              transactionId: booking.transactionId,
            });
          });
        }
        this.bookingTableData$ = of(bookingTableData);
      });
    });
  }

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
      if (result === 'success') {
        this.getBookingList();
        $.alert({
          title: '',
          type: 'green',
          content: 'Transaction success!',
        });
      }
    });
  }

  addBookingDialog(): void {
    const dialogRef = this.dialog.open(BookingRoomComponent, {
      disableClose: true,
      autoFocus: true,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getBookingList();
        $.alert({
          title: '',
          type: 'green',
          content: 'Booking created successful!',
        });
      }
    });
  }
}
