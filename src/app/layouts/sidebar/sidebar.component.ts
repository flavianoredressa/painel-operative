import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { NgClass } from '@angular/common';
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
  animations: [sideBarOpenClose],
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, NgClass, ShortNamePipe, ImgFallbackDirective]
})
export class SidebarComponent {
  public sessionContext = inject(SessionContext);
  public useSideBar = inject(SideBarContext);

  userAuth = this.sessionContext.getLoggedUserFire;

  default = SidebarItems;
  others = SidebarOthersItems;

  get positionClass() {
    return window.innerWidth > 768 ? 'relative' : 'fixed';
  }

  goToPage() {
    if (this.positionClass === 'fixed') {
      this.useSideBar.setExpanded(true);
    }
  }
}
