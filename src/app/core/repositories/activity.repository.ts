/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Activity } from '@models/activity';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Activity[]>(`${environment.urlApi}/activties`).pipe(
      map((res: any) => {
        return res.lista;
      })
    );
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/activties/${id}`));
    return;
  }
}
