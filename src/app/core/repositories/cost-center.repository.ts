/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { CostCenter } from '@models/cost-center';
import { lastValueFrom } from 'rxjs';

type CreateCostCenter = Pick<AddDocument<CostCenter>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class CostCenterRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<CostCenter[]>(`${environment.urlApi}/cost-center`);
  }

  async getStatusById(id: string) {
    const costCenter = await lastValueFrom(this.httpClient.get<CostCenter>(`${environment.urlApi}/cost-center/${id}`));
    return costCenter;
  }

  async create(costCenter: CreateCostCenter) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/cost-center`, costCenter));
    return;
  }

  async update(id: string, costCenter: CreateCostCenter) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/cost-center/${id}`, costCenter));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/cost-center/${id}`));
    return;
  }
}
