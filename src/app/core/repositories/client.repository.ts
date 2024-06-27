/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { Client } from '@models/client';
import { lastValueFrom } from 'rxjs';

type CreateClient = Pick<AddDocument<Client>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class ClientRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Client[]>(`${environment.urlApi}/clients`);
  }

  async getStatusById(id: string) {
    const client = await lastValueFrom(this.httpClient.get<Client>(`${environment.urlApi}/clients/${id}`));
    return client;
  }

  async create(client: CreateClient) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/clients`, client));
    return;
  }

  async update(id: string, client: CreateClient) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/clients/${id}`, client));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/clients/${id}`));
    return;
  }
}
