import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { ZipCode } from '@interfaces/zip-code';

@Injectable()
export class ZipCodeService {
  private http = inject(HttpClient);

  search(cep: string): Promise<ZipCode> {
    return lastValueFrom(this.http.get<ZipCode>(`https://brasilapi.com.br/api/cep/v1/${cep}`));
  }
}
