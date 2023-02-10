import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { catchError, throwError } from 'rxjs';
import { Customer, ReviewCreate } from 'src/app/models/customer-api';
import { MicroserviceStore } from 'src/app/store/microservice.store';
import { ApiDataService } from '../../services/api-data.service';
defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  reviewForm: FormGroup;
  customer: Customer | null = null;
  submitFormProgress: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddReviewComponent>,
    private fb: FormBuilder,
    private apiDataService: ApiDataService,
    private microserviceStore: MicroserviceStore
  ) {
    this.reviewForm = fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      rate: new FormControl(1, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.microserviceStore.user$.subscribe((res) => {
      this.customer = res;
    });
  }

  async submitReviewForm(): Promise<void> {
    if (this.reviewForm.valid) {
      this.submitFormProgress = true;
      const formDetail = this.reviewForm.value;

      const reviewDetail: ReviewCreate = {
        customerNumber: this.customer!.custNumber,
        title: formDetail.title,
        description: formDetail.description,
        rate: formDetail.rate,
      };

      const submitDetail = await this.apiDataService.reviewCreate(reviewDetail);
      submitDetail
        .pipe(
          catchError((err) => {
            if (err.error.status == 406) {
              this.dialogRef.close('not-booked');
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

  reviewRatingChanged(event: any): void {
    const rate = event.detail;
    this.reviewForm.controls['rate'].setValue(rate);
  }

  reviewRateStatus(rate: number): string {
    const rateStatus: string[] = [
      'Terrible',
      'Poor',
      'Average',
      'Very Good',
      'Excellent',
    ];

    return rateStatus[rate - 1];
  }
}
