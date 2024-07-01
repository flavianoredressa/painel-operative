/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { Collaborator } from '@models/collaborator';
import { lastValueFrom } from 'rxjs';

type CreateCollaborator = Pick<AddDocument<Collaborator>, 'admission_date' | 'active' | 'birth_date'>;

@Injectable({
  providedIn: 'root'
})
export class CollaboratorRepository {
  constructor(private httpClient: HttpClient) {}

  async getAll() {
    const res = await lastValueFrom(this.httpClient.get<Collaborator[]>(`${environment.urlApi}/collaborator`));
    return res;
  }

  async create(collaborator: CreateCollaborator) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/collaborator`, collaborator));
    return;
  }

  async getStatusById(id: string) {
    const collaborator = await lastValueFrom(
      this.httpClient.get<Collaborator>(`${environment.urlApi}/collaborator/${id}`)
    );
    return collaborator;
  }

  async update(id: string, collaborator: CreateCollaborator) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/collaborator/${id}`, collaborator));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/collaborator/${id}`));
    return;
  }
}
