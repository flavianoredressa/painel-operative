/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { StatusSale } from '@models/status-sale';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusSaleRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<StatusSale[]>(`${environment.urlApi}/status-sale`).pipe(
      map((res: any) => {
        console.warn(res);
        return res;
      })
    );
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/status-sale/${id}`));
    return;
  }
}
