/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { PaymentMethod } from '@models/payment-method';
import { lastValueFrom } from 'rxjs';

type CreatePaymentMethod = Pick<AddDocument<PaymentMethod>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<[PaymentMethod]>(`${environment.urlApi}/payment-method`);
  }

  async getStatusById(id: string) {
    const payment = await lastValueFrom(this.httpClient.get<PaymentMethod>(`${environment.urlApi}/journey/${id}`));
    return payment;
  }

  async create(payment: CreatePaymentMethod) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/payment-method`, payment));
    return;
  }

  async update(id: string, payment: CreatePaymentMethod) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/payment-method/${id}`, payment));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/payment-method/${id}`));
    return;
  }
}
