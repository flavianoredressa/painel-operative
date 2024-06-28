/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { Activity } from '@models/activity';
import { lastValueFrom } from 'rxjs';

type CreateActivity = Pick<AddDocument<Activity>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class ActivityRepository {
  constructor(private httpClient: HttpClient) {}

  async getAll() {
    const res = await lastValueFrom(this.httpClient.get<Activity[]>(`${environment.urlApi}/activity`));
    return res;
  }

  async getActivityById(id: string) {
    const activity = await lastValueFrom(this.httpClient.get<Activity>(`${environment.urlApi}/activity/${id}`));
    return activity;
  }

  async create(activity: CreateActivity) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/activity`, activity));
    return;
  }

  async update(id: string, activity: CreateActivity) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/activity/${id}`, activity));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/activity/${id}`));
    return;
  }
}
