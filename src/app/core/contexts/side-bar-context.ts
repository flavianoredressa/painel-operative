import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarContext {
  private expanded = signal(window.matchMedia('(max-width: 992px)').matches);

  setExpanded(value: boolean) {
    return this.expanded.set(value);
  }

  get isExpanded() {
    return this.expanded.asReadonly();
  }

  toggle() {
    this.expanded.update(value => !value);
  }
}
