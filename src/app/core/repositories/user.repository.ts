import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base64ToFile } from '@burand/angular';
import { lastValueFrom } from 'rxjs';

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

  getUser(id: string) {
    console.log(id);
    // this.httpClient.post(`${environment.urlApi}/`);
  }
}
