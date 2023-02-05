import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-transaction',
  templateUrl: './booking-transaction.component.html',
  styleUrls: ['./booking-transaction.component.css'],
})
export class BookingTransactionComponent implements OnInit {
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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

  submitTransactionForm(): void {
    if (this.transactionForm.valid && this.data) {
      console.log('data binding:', this.data);
      console.log(this.transactionForm.value);
    }
  }
}
