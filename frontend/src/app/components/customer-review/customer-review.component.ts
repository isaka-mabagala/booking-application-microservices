import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { Review } from 'src/app/models/customer-api';
import { MicroserviceStore } from 'src/app/store/microservice.store';
import { ApiDataService } from '../../services/api-data.service';
import { AddReviewComponent } from '../add-review/add-review.component';
import { UpdateReviewComponent } from '../update-review/update-review.component';
const md5 = require('md5');
defineComponents(IgcRatingComponent);
declare var $: any;

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css'],
})
export class CustomerReviewComponent implements OnInit {
  customerReview: Review | null = null;
  customerReviews: Review[] | null = null;

  constructor(
    private dialog: MatDialog,
    private apiDataService: ApiDataService,
    private microserviceStore: MicroserviceStore
  ) {}

  ngOnInit(): void {
    this.getCustomerReviews();
  }

  async getCustomerReviews(): Promise<void> {
    this.microserviceStore.user$.subscribe(async (res) => {
      const custNumber = res.custNumber;
      const reviews = await this.apiDataService.customerReviews();

      reviews.subscribe((res) => {
        if (res.length) {
          this.customerReviews = res
            .filter((r) => {
              if (r.customerNumber != custNumber) {
                return r;
              }
              return null;
            })
            .sort(function (a, b) {
              const aDate = new Date(a.createdDate.toString());
              const bDate = new Date(b.createdDate.toString());
              return bDate.getTime() - aDate.getTime();
            });

          this.customerReview = res.filter((r) => {
            if (r.customerNumber === custNumber) {
              return r;
            }
            return null;
          })[0];
        }
      });
    });
  }

  addReviewDialog(): void {
    const dialogRef = this.dialog.open(AddReviewComponent, {
      disableClose: true,
      autoFocus: true,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getCustomerReviews();
        $.alert({
          title: '',
          type: 'green',
          content: 'Review created successful!',
        });
      } else if (result === 'not-booked') {
        $.alert({
          title: '',
          type: 'red',
          content: 'You must have booked room before write a review',
        });
      }
    });
  }

  updateReviewDialog(): void {
    const dialogRef = this.dialog.open(UpdateReviewComponent, {
      disableClose: true,
      width: '500px',
      data: this.customerReview,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getCustomerReviews();
        $.alert({
          title: '',
          type: 'green',
          content: 'Review updated successful!',
        });
      }
    });
  }

  emailGravatarURL(email: string): string {
    const address = String(email).trim().toLowerCase();
    const hash = md5(address);

    return `https://www.gravatar.com/avatar/${hash}`;
  }
}
