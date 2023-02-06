import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css'],
})
export class UpdateReviewComponent implements OnInit {
  reviewForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reviewForm = fb.group({
      title: new FormControl('The amazing title', [Validators.required]),
      description: new FormControl('The amazing review body', [
        Validators.required,
      ]),
      rate: new FormControl(4, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submitReviewForm(): void {
    if (this.reviewForm.valid) {
      console.log(this.reviewForm.value);
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
