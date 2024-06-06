/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Tag } from '@models/tag';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Tag[]>(`${environment.urlApi}/tags`).pipe(
      map((res: any) => {
        return res.lista;
      })
    );
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/tags/${id}`));
    return;
  }
}
