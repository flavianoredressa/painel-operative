import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { sideBarOpenClose } from '@animations/side-bar-open-close';
import { ImgFallbackDirective, ShortNamePipe } from '@burand/angular';
import { SessionContext } from '@contexts/session.context';
import { SideBarContext } from '@contexts/side-bar-context';
import { SidebarItems, SidebarOthersItems } from '@core/datas/sidebar-items';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sideBarOpenClose],
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
    NgClass,
    AsyncPipe,
    NgIf,
    ShortNamePipe,
    ImgFallbackDirective
  ]
})
export class SidebarComponent {
  public sessionContext = inject(SessionContext);
  public useSideBar = inject(SideBarContext);

  userAuth = this.sessionContext.getLoggedUserFire;

  default = SidebarItems;
  others = SidebarOthersItems;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.useSideBar.setExpanded(event.target.innerWidth > 768 ? false : true);
  }

  get positionClass() {
    return window.innerWidth > 768 ? 'relative' : 'fixed';
  }

  goToPage() {
    if (this.positionClass === 'fixed') {
      this.useSideBar.setExpanded(true);
    }
  }
}
