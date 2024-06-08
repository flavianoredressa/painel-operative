import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleSignal: WritableSignal<string> = signal('');

  constructor() {
    this.setTitle();
  }

  setTitle(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        map(route => route.snapshot.routeConfig?.title as string)
      )
      .subscribe(title => {
        this.titleSignal.set(title);
      });
  }

  getTitle() {
    return this.titleSignal.asReadonly();
  }
}
