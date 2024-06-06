/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { StatusSale } from '@models/status-sale';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusSaleRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<StatusSale[]>(`${environment.urlApi}/status-sale`);
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/status-sale/${id}`));
    return;
  }
}
