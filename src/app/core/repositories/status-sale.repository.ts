/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { StatusSale } from '@models/status-sale';
import { lastValueFrom } from 'rxjs';

type CreateStatusSale = Pick<AddDocument<StatusSale>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class StatusSaleRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<StatusSale[]>(`${environment.urlApi}/status-sale`);
  }

  async getUserById(id: string) {
    const statusSale = await lastValueFrom(this.httpClient.get<StatusSale>(`${environment.urlApi}/status-sale/${id}`));
    return statusSale;
  }

  async create(statusSale: CreateStatusSale) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/status-sale`, statusSale));
    return;
  }

  async update(id: string, statusSale: CreateStatusSale) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/status-sale/${id}`, statusSale));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/status-sale/${id}`));
    return;
  }
}
