import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base64ToFile } from '@burand/angular';
import { environment } from '@environment';
import { User } from '@models/user';
import { lastValueFrom } from 'rxjs';

type UpdateParams = {
  email: string;
  name: string;
  password?: string;
};

@Injectable({
  providedIn: 'root'
})
export class UserRepository {
  constructor(private httpClient: HttpClient) {}

  updateAvatar(userId: string, base64: string) {
    const file = base64ToFile(base64);

    const formData = new FormData();
    formData.append('file', file);

    return lastValueFrom(this.httpClient.patch<string>(`/users/${userId}/avatar`, formData));
  }

  async getUserById(id: string) {
    const user = await lastValueFrom(this.httpClient.get<User>(`${environment.urlApi}/users/${id}`));
    return user;
  }

  public async update(id: string, data: UpdateParams): Promise<string> {
    await lastValueFrom(this.httpClient.put<User>(`${environment.urlApi}/users/${id}`, data));
    return null;
  }
}
