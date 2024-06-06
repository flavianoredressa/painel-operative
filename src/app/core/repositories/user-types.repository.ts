/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { UserTypes } from '@models/user-types';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTypesRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<UserTypes[]>(`${environment.urlApi}/user-types`).pipe(
      map((res: any) => {
        return res.lista;
      })
    );
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/user-types/${id}`));
    return;
  }
}
