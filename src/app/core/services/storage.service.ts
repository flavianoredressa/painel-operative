import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base64ToFile } from '@burand/angular/utils';
import { lastValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { environment } from '@environment';

interface UploadResponse {
  files: {
    url: string;
  }[];
}

type PathType = 'images' | 'files';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private _http: HttpClient) {}

  async deleteFile(url: string, path: PathType) {
    const formData = new FormData();
    formData.append('endpoint', environment.storage.endpoint);
    formData.append('bucket', environment.storage.bucket);
    formData.append('url', url);

    await lastValueFrom(this._http.post(`${environment.storage.url}/s3/${path}/delete`, formData));
  }

  uploadBase64(base64: string, path: PathType = 'images') {
    const file = base64ToFile(base64);

    return this.upload(file, path);
  }

  uploadFile(file: File, path: PathType = 'images') {
    return this.upload(file, path);
  }

  private async upload(file: File, path: PathType) {
    const formData = new FormData();

    const [, filetype] = file.type.split('/');
    const extension = filetype ? filetype : this.getFileExtension(file.name);

    const fileName = `${uuidv4()}.${extension}`;

    formData.append('files', file, fileName);
    formData.append('bucket', environment.storage.bucket);
    formData.append('endpoint', environment.storage.endpoint);

    const uploaded = await lastValueFrom(
      this._http.post<UploadResponse>(`${environment.storage.url}/s3/${path}`, formData)
    );
    return uploaded.files[0].url;
  }

  private getFileExtension(fileName: string) {
    const nameParts = fileName.split('.');
    return nameParts.length > 1 ? nameParts[nameParts.length - 1] : null;
  }
}
