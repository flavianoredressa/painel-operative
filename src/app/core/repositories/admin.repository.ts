import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AddDocument } from '@burand/angular/typings';
import { lastValueFrom } from 'rxjs';

import { environment } from '@environment';
import { Admin } from '@models/admin';
import { User } from '@models/user';

type CreateAdmin = Pick<AddDocument<Admin>, 'name' | 'email'>;

type UpdateParams = {
  email: string;
  name: string;
  password?: string;
};

@Injectable({
  providedIn: 'root'
})
export class AdminRepository {
  _http = inject(HttpClient);

  public async add(admin: CreateAdmin): Promise<string> {
    await lastValueFrom(this._http.post<Admin>('/admins', admin));
    return null;
  }

  public async delete(id: string): Promise<unknown> {
    await lastValueFrom(this._http.delete<Admin>(`/admins/${id}`));
    return null;
  }

  getAll() {
    return this._http.get<User[]>(`${environment.urlApi}/admins`);
  }

  public async update(id: string, data: UpdateParams): Promise<string> {
    await lastValueFrom(this._http.put<User>(`${environment.urlApi}/admins/${id}`, data));
    return null;
  }
}
