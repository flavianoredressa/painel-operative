/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { CostCenter } from '@models/cost-center';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostCenterRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<CostCenter[]>(`${environment.urlApi}/cost-center`);
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/cost-center/${id}`));
    return;
  }
}
