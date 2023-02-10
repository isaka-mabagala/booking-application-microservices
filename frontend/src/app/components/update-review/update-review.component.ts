import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { Review, ReviewCreate } from 'src/app/models/customer-api';
import { ApiDataService } from '../../services/api-data.service';
defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css'],
})
export class UpdateReviewComponent implements OnInit {
  reviewForm: FormGroup;
  submitFormProgress: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<UpdateReviewComponent>,
    private fb: FormBuilder,
    private apiDataService: ApiDataService,
    @Inject(MAT_DIALOG_DATA) private review: Review
  ) {
    this.reviewForm = fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      rate: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.reviewForm.controls['rate'].setValue(this.review.rate);
    this.reviewForm.controls['title'].setValue(this.review.title);
    this.reviewForm.controls['description'].setValue(this.review.description);
  }

  async submitReviewForm(): Promise<void> {
    if (this.reviewForm.valid) {
      this.submitFormProgress = true;
      const formDetail = this.reviewForm.value;

      const reviewDetail: ReviewCreate = {
        customerNumber: this.review.customerNumber,
        title: formDetail.title,
        description: formDetail.description,
        rate: formDetail.rate,
      };

      const submitDetail = await this.apiDataService.reviewUpdate(reviewDetail);
      submitDetail.subscribe(() => {
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
