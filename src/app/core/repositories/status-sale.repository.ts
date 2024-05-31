/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusSaleRepository {
  constructor(private httpClient: HttpClient) {}

  async getAll() {
    const lista: any = await lastValueFrom(this.httpClient.get(`${environment.urlApi}/status-sale`));
    return lista.lista;
  }
}
