/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { StatusTask } from '@models/status-task';
import { lastValueFrom } from 'rxjs';

type CreatestatusTask = Pick<AddDocument<StatusTask>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class StatusTaskRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<StatusTask[]>(`${environment.urlApi}/status-task`);
  }

  async getStatusById(id: string) {
    const statusTask = await lastValueFrom(this.httpClient.get<StatusTask>(`${environment.urlApi}/status-task/${id}`));
    return statusTask;
  }

  async create(statusTask: CreatestatusTask) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/status-task`, statusTask));
    return;
  }

  async update(id: string, statusTask: CreatestatusTask) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/status-task/${id}`, statusTask));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/status-task/${id}`));
    return;
  }
}
