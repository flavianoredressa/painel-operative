import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, serverTimestamp } from '@angular/fire/firestore';
import { FirebaseAbstract, base64ToFile } from '@burand/angular';
import { lastValueFrom } from 'rxjs';

import { FirestoreCollecionName } from '@configs/firestore-collection-name';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UserRepository extends FirebaseAbstract<User> {
  constructor(
    protected firestore: Firestore,
    private httpClient: HttpClient
  ) {
    super(firestore, FirestoreCollecionName.USERS);
  }

  setLastAccess(userId: string) {
    return this.update({
      id: userId,
      lastAccess: serverTimestamp()
    });
  }

  updateAvatar(userId: string, base64: string) {
    const file = base64ToFile(base64);

    const formData = new FormData();
    formData.append('file', file);

    return lastValueFrom(this.httpClient.patch<string>(`/users/${userId}/avatar`, formData));
  }
}
