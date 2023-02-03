import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css'],
})
export class CustomerLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submitLoginForm(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
