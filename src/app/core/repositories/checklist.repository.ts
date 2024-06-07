/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Checklist } from '@models/checklist';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecklistRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<[Checklist]>(`${environment.urlApi}/checklists`);
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/checklists/${id}`));
    return;
  }
}
