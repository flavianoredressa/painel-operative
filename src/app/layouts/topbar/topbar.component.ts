import { NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
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
  imports: [LucideAngularModule, ShortNamePipe, ImgFallbackDirective, NgClass, NgbDropdownModule]
})
export class TopbarComponent implements OnInit {
  private router = inject(Router);
  private sessionContext = inject(SessionContext);
  public useSideBar = inject(SideBarContext);
  private titleService = inject(TitleService);

  title = this.titleService.getTitle();
  isMobile = signal(false);

  version = environment.appVersion;
  currentUser = this.sessionContext.getLoggedUserFire;

  constructor() {
    this.isMobile.set(document.documentElement.clientWidth < 768 ? true : false);
  }

  ngOnInit() {
    console.log(this.currentUser());
  }

  openNotification(): void {}
  changeColor(): void {}

  async logout() {
    await this.sessionContext.logout();
    await this.router.navigateByUrl('/login');
  }
}
