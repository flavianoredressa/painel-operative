import { Injectable, Injector, Signal, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Auth, User as FireUser, ParsedToken, authState, signOut } from '@angular/fire/auth';
import { LocalStorage } from '@burand/angular';
import { Observable, Subscription, filter, firstValueFrom } from 'rxjs';

import { User } from '@models/user';
import { UserRepository } from '@repositories/user.repository';

const KEY = '@application/session/user';

@Injectable({
  providedIn: 'root'
})
export class SessionContext {
  private auth = inject(Auth);
  private userRepository = inject(UserRepository);
  private injector = inject(Injector);

  private user = signal<User>(LocalStorage.getItem<User>(KEY));
  private disposable: Subscription = null;

  constructor() {
    this.authState$.subscribe(currentUser => {
      if (currentUser) {
        this.listeners(currentUser.uid);
        this.userRepository.setLastAccess(currentUser.uid);
        return;
      }

      this.unlisteners();
    });
  }

  get authState$(): Observable<FireUser> {
    return authState(this.auth);
  }

  async getBearerToken(): Promise<string> {
    const userLogged = await this.getFirebaseUser();
    return userLogged.getIdToken();
  }

  async getClaims(): Promise<ParsedToken> {
    const currentUser = await this.getFirebaseUser();

    const { claims } = await currentUser.getIdTokenResult();

    return claims;
  }

  getFirebaseUser(): Promise<FireUser> {
    return firstValueFrom(this.authState$);
  }

  get getLoggedUser(): Signal<User> {
    return this.user.asReadonly();
  }

  private setLoggedUser(user: User): void {
    this.user.set(user);
    LocalStorage.setItem(KEY, user);
  }

  getLoggedUserId(): string {
    return this.getLoggedUser()?.id;
  }

  async logout(): Promise<void> {
    LocalStorage.removeItem(KEY);

    this.user.set(null);

    await signOut(this.auth);
  }

  fetchLoggedUser() {
    return firstValueFrom(
      toObservable(this.user, {
        injector: this.injector
      }).pipe(filter(loggedIn => loggedIn !== null))
    );
  }

  private listeners(userId: string): void {
    this.disposable = this.userRepository.getAsyncById(userId).subscribe(data => {
      this.setLoggedUser(data);
    });
  }

  private unlisteners(): void {
    this.disposable?.unsubscribe();
  }
}
