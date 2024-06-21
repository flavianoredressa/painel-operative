/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { UserTypes } from '@models/user-types';
import { lastValueFrom } from 'rxjs';

type CreateUserTypes = Pick<AddDocument<UserTypes>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class UserTypesRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<UserTypes[]>(`${environment.urlApi}/user-types`);
  }

  async getStatusById(id: string) {
    const userTypes = await lastValueFrom(this.httpClient.get<UserTypes>(`${environment.urlApi}/user-types/${id}`));
    return userTypes;
  }

  async create(userTypes: CreateUserTypes) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/user-types`, userTypes));
    return;
  }

  async update(id: string, userTypes: CreateUserTypes) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/user-types/${id}`, userTypes));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/user-types/${id}`));
    return;
  }
}
