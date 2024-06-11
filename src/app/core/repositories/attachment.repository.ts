/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Attachment } from '@models/attachment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentRepository {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<[Attachment]>(`${environment.urlApi}/attachments`);
  }

  async delete(id: string) {
    await lastValueFrom(this.httpClient.delete(`${environment.urlApi}/attachments/${id}`));
    return;
  }
}
