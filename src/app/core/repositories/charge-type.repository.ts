/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { ChargeType } from '@models/charge-type';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargeTypeRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<ChargeType[]>(`${environment.urlApi}/charge-type`).pipe(
      map((res: any) => {
        return res.lista;
      })
    );
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/charge-type/${id}`));
    return;
  }
}
