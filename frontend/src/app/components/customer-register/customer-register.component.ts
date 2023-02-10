import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { CustomerRegister } from 'src/app/models/customer-api';
import { ApiDataService } from '../../services/api-data.service';
declare var $: any;

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css'],
})
export class CustomerRegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitFormProgress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private apiDataService: ApiDataService
  ) {
    this.registerForm = fb.group({
      fName: new FormControl('', [Validators.required]),
      lName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  async submitRegisterForm(): Promise<void> {
    if (this.registerForm.valid) {
      this.submitFormProgress = true;
      const formDetail = this.registerForm.value;
      const customerDetail: CustomerRegister = {
        firstName: formDetail.fName,
        lastName: formDetail.lName,
        email: formDetail.email,
        password: formDetail.pass,
      };

      const submitDetail = await this.apiDataService.customerRegister(
        customerDetail
      );

      submitDetail
        .pipe(
          catchError((err) => {
            if (err.error.status == 409) {
              $.alert({ title: '', type: 'red', content: err.error.message });
            }
            this.submitFormProgress = false;
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          this.submitFormProgress = false;
          $.confirm({
            title: '',
            content: 'You registered successful!',
            buttons: {
              ok: () => {
                this._router.navigateByUrl('/');
              },
            },
          });
        });
    }
  }
}
