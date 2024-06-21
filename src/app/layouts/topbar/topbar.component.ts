import { NgClass } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ImgFallbackDirective, ShortNamePipe } from '@burand/angular';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LucideAngularModule } from 'lucide-angular';

import { SessionContext } from '@contexts/session.context';
import { SideBarContext } from '@contexts/side-bar-context';
import { environment } from '@environment';
import { TitleService } from '@services/title.service';

@Component({
  standalone: true,
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.comonete.scss'],
  imports: [NgbDropdownModule, LucideAngularModule, ShortNamePipe, ImgFallbackDirective, NgClass]
})
export class TopbarComponent {
  private router = inject(Router);
  private useSession = inject(SessionContext);
  public useSideBar = inject(SideBarContext);
  private titleService = inject(TitleService);

  title: Signal<string>;
  isMobile = false;

  version = environment.appVersion;
  currentUser = this.useSession.getLoggedUserFire;

  constructor() {
    this.isMobile = (document.documentElement.clientWidth < 768 ? true : false);
    this.title = this.titleService.getTitle();
  }

  openNotification(): void {}
  changeColor(): void {}

  async logout() {
    await this.useSession.logout();
    await this.router.navigateByUrl('/login');
  }
}
