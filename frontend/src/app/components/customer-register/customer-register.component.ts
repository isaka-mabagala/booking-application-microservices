import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css'],
})
export class CustomerRegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private _router: Router) {
    this.registerForm = fb.group({
      fName: new FormControl('', [Validators.required]),
      lName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submitRegisterForm(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      $.confirm({
        title: '',
        content: 'You registered successful!',
        buttons: {
          ok: () => {
            this._router.navigateByUrl('/');
          },
        },
      });
    }
  }
}
