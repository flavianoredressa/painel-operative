/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { Journey } from '@models/journey';
import { lastValueFrom } from 'rxjs';

type CreateJourney = Pick<AddDocument<Journey>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class JourneyRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Journey[]>(`${environment.urlApi}/journey`);
  }

  async getStatusById(id: string) {
    const journey = await lastValueFrom(this.httpClient.get<Journey>(`${environment.urlApi}/journey/${id}`));
    return journey;
  }

  async create(journey: CreateJourney) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/journey`, journey));
    return;
  }

  async update(id: string, journey: CreateJourney) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/journey/${id}`, journey));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/journey/${id}`));
    return;
  }
}
