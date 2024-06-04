/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { StatusTask } from '@models/status-task';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusTaskRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<StatusTask[]>(`${environment.urlApi}/status-task`).pipe(
      map((res: StatusTask[]) => {
        console.log(res);
        return res;
      })
    );
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/status-task/${id}`));
    return;
  }
}
