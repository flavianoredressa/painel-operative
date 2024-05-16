import { Injectable, Signal, inject, signal } from '@angular/core';
import { Auth, User as FireUser, authState, signOut } from '@angular/fire/auth';
import { LocalStorage } from '@burand/angular';
import { Observable, firstValueFrom } from 'rxjs';

import { User } from '@models/user';

const KEY = '@application/session/user';

@Injectable({
  providedIn: 'root'
})
export class SessionContext {
  private auth = inject(Auth);

  private user = signal<User>(LocalStorage.getItem<User>(KEY));

  constructor() {}

  get authState$(): Observable<FireUser> {
    return authState(this.auth);
  }

  async getBearerToken(): Promise<string> {
    const userLogged = await this.getFirebaseUser();
    return userLogged.getIdToken();
  }

  getFirebaseUser(): Promise<FireUser> {
    return firstValueFrom(this.authState$);
  }

  get getLoggedUser(): Signal<User> {
    return this.user.asReadonly();
  }

  getLoggedUserId(): string {
    return this.getLoggedUser()?.id;
  }

  async logout(): Promise<void> {
    LocalStorage.removeItem(KEY);

    this.user.set(null);

    await signOut(this.auth);
  }
}
