import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import {
  BookingCreate,
  BookingDetail,
  BookingTransaction,
  Customer,
  CustomerAuth,
  CustomerLogin,
  CustomerRegister,
  Review,
  ReviewCreate,
  TransactionDetail,
} from '../models/customer-api';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  async customerLogin(
    detail: CustomerLogin
  ): Promise<Observable<CustomerAuth>> {
    const baseApiUrl = env.customerApiURL;

    return this.http.post<CustomerAuth>(
      `${baseApiUrl}/api/customer/auth`,
      detail
    );
  }

  async customerRegister(
    detail: CustomerRegister
  ): Promise<Observable<Object>> {
    const baseApiUrl = env.customerApiURL;

    return this.http.post(`${baseApiUrl}/api/customer/register`, detail);
  }

  async customerDetailByEmail(email: string): Promise<Observable<Customer>> {
    const baseApiUrl = env.customerApiURL;
    const accessToken = await this.localStorageService.getItem('token');

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    const params = new HttpParams().set('email', email);

    return this.http.get<Customer>(`${baseApiUrl}/api/customer`, {
      params,
      headers,
    });
  }

  async transactionById(id: number): Promise<Observable<TransactionDetail>> {
    const baseApiUrl = env.paymentApiURL;
    const accessToken = await this.localStorageService.getItem('token');

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.get<TransactionDetail>(
      `${baseApiUrl}/api/transaction/${id}`,
      { headers }
    );
  }

  async bookingsByCustomer(
    customerNumber: string
  ): Promise<Observable<BookingDetail[]>> {
    const baseApiUrl = env.bookingApiURL;
    const accessToken = await this.localStorageService.getItem('token');

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    const params = new HttpParams().set('number', customerNumber);

    return this.http.get<BookingDetail[]>(`${baseApiUrl}/api/booking`, {
      params,
      headers,
    });
  }

  async bookingCreate(detail: BookingCreate): Promise<Observable<Object>> {
    const baseApiUrl = env.bookingApiURL;
    const accessToken = await this.localStorageService.getItem('token');

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.post(`${baseApiUrl}/api/booking`, detail, { headers });
  }

  async bookingTransaction(
    detail: BookingTransaction
  ): Promise<Observable<Object>> {
    const baseApiUrl = env.bookingApiURL;
    const accessToken = await this.localStorageService.getItem('token');

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.post(`${baseApiUrl}/api/booking/transaction`, detail, {
      headers,
    });
  }

  async reviewCreate(detail: ReviewCreate): Promise<Observable<Object>> {
    const baseApiUrl = env.reviewApiURL;
    const accessToken = await this.localStorageService.getItem('token');

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.post(`${baseApiUrl}/api/review/create`, detail, {
      headers,
    });
  }

  async reviewUpdate(detail: ReviewCreate): Promise<Observable<Object>> {
    const baseApiUrl = env.reviewApiURL;
    const accessToken = await this.localStorageService.getItem('token');

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.put(`${baseApiUrl}/api/review/update`, detail, {
      headers,
    });
  }

  async customerReviews(): Promise<Observable<Review[]>> {
    const baseApiUrl = env.reviewApiURL;
    const accessToken = await this.localStorageService.getItem('token');

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.get<Review[]>(`${baseApiUrl}/api/reviews`, {
      headers,
    });
  }
}
