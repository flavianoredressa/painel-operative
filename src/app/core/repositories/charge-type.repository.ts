/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { ChargeType } from '@models/charge-type';
import { lastValueFrom } from 'rxjs';

type CreateChargeType = Pick<AddDocument<ChargeType>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class ChargeTypeRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<ChargeType[]>(`${environment.urlApi}/charge-type`);
  }

  async getStatusById(id: string) {
    const chargeType = await lastValueFrom(this.httpClient.get<ChargeType>(`${environment.urlApi}/charge-type/${id}`));
    return chargeType;
  }

  async create(chargeType: CreateChargeType) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/charge-type`, chargeType));
    return;
  }

  async update(id: string, chargeType: CreateChargeType) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/charge-type/${id}`, chargeType));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/charge-type/${id}`));
    return;
  }
}
