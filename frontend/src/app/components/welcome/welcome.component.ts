import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer-api';
import { MicroserviceStore } from '../../store/microservice.store';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  customerDetail$: Observable<Customer>;

  constructor(private microserviceStore: MicroserviceStore) {
    this.customerDetail$ = this.microserviceStore.user$;
  }

  ngOnInit(): void {}
}
