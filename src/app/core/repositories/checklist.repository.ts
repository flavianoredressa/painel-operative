/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { Checklist } from '@models/checklist';
import { lastValueFrom } from 'rxjs';

type CreateChecklist = Pick<AddDocument<Checklist>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class ChecklistRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Checklist[]>(`${environment.urlApi}/checklists`);
  }

  async getStatusById(id: string) {
    const checklist = await lastValueFrom(this.httpClient.get<Checklist>(`${environment.urlApi}/checklists/${id}`));
    return checklist;
  }

  async create(checklist: CreateChecklist) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/checklists`, checklist));
    return;
  }

  async update(id: string, checklist: CreateChecklist) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/checklists/${id}`, checklist));
    return;
  }

  async getStatusById(id: string) {
    const checklist = await lastValueFrom(this.httpClient.get<Checklist>(`${environment.urlApi}/checklists/${id}`));
    return checklist;
  }

  async create(checklist: CreateChecklist) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/checklists`, checklist));
    return;
  }

  async update(id: string, checklist: CreateChecklist) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/checklists/${id}`, checklist));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/checklists/${id}`));
    return;
  }
}
