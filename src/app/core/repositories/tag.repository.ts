/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddDocument } from '@burand/angular';
import { environment } from '@environment';
import { Tag } from '@models/tag';
import { lastValueFrom } from 'rxjs';

type CreateTag = Pick<AddDocument<Tag>, 'name' | 'active'>;

@Injectable({
  providedIn: 'root'
})
export class TagRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Tag[]>(`${environment.urlApi}/tags`);
  }

  async getStatusById(id: string) {
    const tag = await lastValueFrom(this.httpClient.get<Tag>(`${environment.urlApi}/tags/${id}`));
    return tag;
  }

  async create(tag: CreateTag) {
    await lastValueFrom(this.httpClient.post(`${environment.urlApi}/tags`, tag));
    return;
  }

  async update(id: string, tag: CreateTag) {
    await lastValueFrom(this.httpClient.put(`${environment.urlApi}/tags/${id}`, tag));
    return;
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/tags/${id}`));
    return;
  }
}
