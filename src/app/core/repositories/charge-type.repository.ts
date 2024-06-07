/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { ChargeType } from '@models/charge-type';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargeTypeRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<ChargeType[]>(`${environment.urlApi}/charge-type`);
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/charge-type/${id}`));
    return;
  }
}
