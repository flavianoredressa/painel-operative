/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { ProjectType } from '@models/project-type';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<ProjectType[]>(`${environment.urlApi}/project-type`);
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/project-type/${id}`));
    return;
  }
}
