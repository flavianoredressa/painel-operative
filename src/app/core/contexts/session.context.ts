import { Injectable, Signal, inject, signal } from '@angular/core';
import { Auth, User as FireUser, UserInfo, authState, signOut } from '@angular/fire/auth';
import { LocalStorage } from '@burand/angular';
import { Observable, firstValueFrom } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '@models/user';
import { UserRepository } from '@repositories/user.repository';

const KEY = '@application/session/user';

@Injectable({
  providedIn: 'root'
})
export class SessionContext {
  private auth = inject(Auth);
  private userRepository = inject(UserRepository);

  private user = signal<User>(LocalStorage.getItem<User>(KEY));
  private userAuth = signal<UserInfo>(null);

  constructor() {
    authState(this.auth)
      .pipe(takeUntilDestroyed())
      .subscribe(async currentUser => {
        if (!currentUser) return;
        const { providerData } = currentUser;
        const userInfo = providerData[0];
        const user = await this.userRepository.getUserById(currentUser.uid);
        this.userAuth.set(userInfo);
        this.user.set(user);
        LocalStorage.setItem(KEY, user ?? null);
      });
  }

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

  get getLoggedUserFire() {
    return this.userAuth;
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
    this.userAuth.set(null);

    await signOut(this.auth);
  }
}
