import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { BookingTransaction } from 'src/app/models/customer-api';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-booking-transaction',
  templateUrl: './booking-transaction.component.html',
  styleUrls: ['./booking-transaction.component.css'],
})
export class BookingTransactionComponent implements OnInit {
  transactionForm: FormGroup;
  formError: any = null;
  submitFormProgress: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<BookingTransactionComponent>,
    private fb: FormBuilder,
    private apiDataService: ApiDataService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    // ^((4\d{3})|(5[1-5]\d{2})|(6011)|(34\d{1})|(37\d{1}))-?\s?\d{4}-?\s?\d{4}-?\s?\d{4}|3[4,7][\d\s-]{15}$
    this.transactionForm = fb.group({
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^((4\\d{3})|(5[1-5]\\d{2})|(6011)|(34\\d{1})|(37\\d{1}))\\s\\d{4}\\s\\d{4}\\s\\d{4}|3[4,7][\\d\\s-]{15}$'
        ),
      ]),
      cardExpiry: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[012])/(2[1-9]|3[0])$'),
      ]),
      cardCvc: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{3}$'),
      ]),
    });
  }

  ngOnInit(): void {}

  async submitTransactionForm(): Promise<void> {
    this.formError = null;

    if (this.transactionForm.valid && this.data) {
      this.submitFormProgress = true;
      const formDetail = this.transactionForm.value;

      const transactionDetail: BookingTransaction = {
        cardCvc: formDetail.cardCvc,
        cardExpiry: formDetail.cardExpiry,
        cardNumber: formDetail.cardNumber,
        bookingNumber: this.data.bookingNumber,
      };

      const submitDetail = await this.apiDataService.bookingTransaction(
        transactionDetail
      );
      submitDetail
        .pipe(
          catchError((err) => {
            if (err.error.status == 406) {
              this.formError = err.error.message;
            }
            this.submitFormProgress = false;
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          this.submitFormProgress = false;
          this.dialogRef.close('success');
        });
    }
  }
}
