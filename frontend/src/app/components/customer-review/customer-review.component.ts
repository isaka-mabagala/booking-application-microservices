import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { AddReviewComponent } from '../add-review/add-review.component';
import { UpdateReviewComponent } from '../update-review/update-review.component';
const md5 = require('md5');
defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css'],
})
export class CustomerReviewComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  addReviewDialog(): void {
    const dialogRef = this.dialog.open(AddReviewComponent, {
      disableClose: true,
      autoFocus: true,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  updateReviewDialog(): void {
    const dialogRef = this.dialog.open(UpdateReviewComponent, {
      disableClose: true,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  emailGravatarURL(email: string): string {
    const address = String(email).trim().toLowerCase();
    const hash = md5(address);

    return `https://www.gravatar.com/avatar/${hash}`;
  }
}
