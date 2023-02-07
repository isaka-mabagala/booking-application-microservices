import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerAuth, CustomerLogin } from '../models/customer-api';
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
    const baseApiUrl = 'http://127.0.0.1:8080';

    return this.http.post<CustomerAuth>(
      `${baseApiUrl}/api/customer/auth`,
      detail
    );
  }

  async customerDetailByEnail(email: string): Promise<Observable<Customer>> {
    const baseApiUrl = 'http://127.0.0.1:8080';
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

  async transactionById(id: number): Promise<Observable<Object>> {
    const baseApiUrl = 'http://127.0.0.1:8083';
    const accessToken = await this.localStorageService.getItem('token');

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.get(`${baseApiUrl}/api/transaction/${id}`, { headers });
  }
}
