import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { TransactionDetail } from 'src/app/models/customer-api';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-booking-transaction-detail',
  templateUrl: './booking-transaction-detail.component.html',
  styleUrls: ['./booking-transaction-detail.component.css'],
})
export class BookingTransactionDetailComponent implements OnInit {
  transaction: Observable<TransactionDetail> = of();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private apiDataService: ApiDataService
  ) {}

  ngOnInit(): void {
    this.viewTransactionDetail();
  }

  async viewTransactionDetail(): Promise<void> {
    if (this.data) {
      this.transaction = await this.apiDataService.transactionById(
        this.data.transactionId
      );
    }
  }
}
