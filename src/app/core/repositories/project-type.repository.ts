/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { ProjectType } from '@models/project-type';
import { lastValueFrom } from 'rxjs';

type CreateProjectType = Pick<AddDocument<ProjectType>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeRepository {
  constructor(private httpClient: HttpClient) {}

  async getAll() {
    const res = await lastValueFrom(this.httpClient.get<ProjectType[]>(`${environment.urlApi}/project-type`));
    return res;
  }

  async getStatusById(id: string) {
    const projectType = await lastValueFrom(
      this.httpClient.get<ProjectType>(`${environment.urlApi}/project-type/${id}`)
    );
    return projectType;
  }

  async create(projectType: CreateProjectType) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/project-type`, projectType));
    return;
  }

  async update(id: string, projectType: CreateProjectType) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/project-type/${id}`, projectType));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/project-type/${id}`));
    return;
  }
}
