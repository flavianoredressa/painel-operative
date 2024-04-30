import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAbstract } from '@burand/angular/firestore';
import { AddDocument } from '@burand/angular/typings';
import { lastValueFrom } from 'rxjs';

import { FirestoreCollecionName } from '@configs/firestore-collection-name';
import { UserType } from '@enums/user-type';
import { Admin } from '@models/admin';

type CreateAdmin = Pick<AddDocument<Admin>, 'name' | 'email'>;

@Injectable({
  providedIn: 'root'
})
export class AdminRepository extends FirebaseAbstract<Admin> {
  constructor(
    protected firestore: Firestore,
    private _http: HttpClient
  ) {
    super(firestore, FirestoreCollecionName.USERS);
  }

  public async add(admin: CreateAdmin): Promise<string> {
    await lastValueFrom(this._http.post<Admin>('/users/admins', admin));

    return null;
  }

  getAll<U extends Admin = Admin>(): Promise<U[]> {
    return this.getWhereMany([
      ['active', '==', true],
      ['type', '==', UserType.ADMIN]
    ]);
  }
}
