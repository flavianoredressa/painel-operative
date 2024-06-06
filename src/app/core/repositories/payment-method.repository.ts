/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { PaymentMethod } from '@models/payment-method';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<[PaymentMethod]>(`${environment.urlApi}/payment-method`);
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/payment-method/${id}`));
    return;
  }
}
