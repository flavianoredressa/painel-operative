/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Activity } from '@models/activity';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Activity[]>(`${environment.urlApi}/activity`);
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/activity/${id}`));
    return;
  }
}
