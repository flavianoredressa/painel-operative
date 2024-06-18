/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { UserTypes } from '@models/user-types';
import { lastValueFrom } from 'rxjs';

type CreateUserType = Pick<AddDocument<UserTypes>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class UserTypesRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<UserTypes[]>(`${environment.urlApi}/user-types`);
  }

  async getStatusById(id: string) {
    const userType = await lastValueFrom(this.httpClient.get<UserTypes>(`${environment.urlApi}/user-types/${id}`));
    return userType;
  }

  async create(userType: CreateUserType) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/user-types`, userType));
    return;
  }

  async update(id: string, userType: CreateUserType) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/user-types/${id}`, userType));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/user-types/${id}`));
    return;
  }
}
