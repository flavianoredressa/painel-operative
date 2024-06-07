/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Collaborator } from '@models/collaborator';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Collaborator[]>(`${environment.urlApi}/collaborator`);
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/collaborator/${id}`));
    return;
  }
}
