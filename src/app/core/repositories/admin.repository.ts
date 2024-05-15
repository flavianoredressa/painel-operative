import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AddDocument } from '@burand/angular/typings';
import { catchError, lastValueFrom, retry, throwError } from 'rxjs';

import { environment } from '@environment';
import { Admin } from '@models/admin';
import { User } from '@models/user';

type CreateAdmin = Pick<AddDocument<Admin>, 'name' | 'email'>;

@Injectable({
  providedIn: 'root'
})
export class AdminRepository {
  _http = inject(HttpClient);

  public async add(admin: CreateAdmin): Promise<string> {
    await lastValueFrom(this._http.post<Admin>('/users/create/admins', admin));
    return null;
  }

  public async update(admin: CreateAdmin): Promise<string> {
    await lastValueFrom(this._http.post<Admin>('/users/create/admins', admin));
    return null;
  }

  getAll() {
    return this._http.get<User[]>(`${environment.urlApi}/users/admins`);
  }

  async getAllPromisse(): Promise<User[]> {
    try {
      const admins = await lastValueFrom(
        this._http.get<User[]>(`${environment.urlApi}/users/admins`).pipe(
          retry(3),
          catchError(error => {
            console.error('Error fetching admins:', error);
            return throwError(() => new Error('Failed to fetch admins'));
          })
        )
      );
      return admins;
    } catch (error) {
      console.error('An error occurred while fetching admins:', error);
      throw error;
    }
  }
}
