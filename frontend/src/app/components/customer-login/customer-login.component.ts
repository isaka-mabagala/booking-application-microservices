import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiDataService } from '../../services/api-data.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { MicroserviceStore } from '../../store/microservice.store';
declare var $: any;

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css'],
})
export class CustomerLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitFormProgress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private microserviceStore: MicroserviceStore,
    private apiDataService: ApiDataService,
    private localStorageService: LocalStorageService
  ) {
    this.loginForm = fb.group({
      email: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  async submitLoginForm(): Promise<void> {
    if (this.loginForm.valid) {
      this.submitFormProgress = true;
      const formDetail = this.loginForm.value;

      const login = await this.apiDataService.customerLogin({
        email: formDetail.email,
        password: formDetail.pass,
      });

      login
        .pipe(
          catchError((err) => {
            if (err.error.status == 400) {
              $.alert({ title: '', type: 'red', content: err.error.message });
            }
            this.submitFormProgress = false;
            return throwError(() => err);
          })
        )
        .subscribe(async (res) => {
          this.submitFormProgress = false;
          await this.localStorageService.setItem('token', res.token);
          this.getCustomerDetail(res.email);
        });
    }
  }

  async getCustomerDetail(email: string): Promise<void> {
    const details = await this.apiDataService.customerDetailByEmail(email);
    details.subscribe((res) => {
      this.microserviceStore.setUser({
        firstName: res.firstName,
        lastName: res.lastName,
        custNumber: res.custNumber,
        email: res.email,
      });
      this.microserviceStore.setIsLogin(true);
      window.location.reload();
    });
  }
}
