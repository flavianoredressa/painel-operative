/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Journey } from '@models/journey';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JourneyRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<[Journey]>(`${environment.urlApi}/journey`);
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/journey/${id}`));
    return;
  }
}
