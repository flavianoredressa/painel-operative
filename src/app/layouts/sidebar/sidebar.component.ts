import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { sideBarOpenClose } from '@animations/side-bar-open-close';
import { SideBarContext } from '@contexts/side-bar-context';
import { SidebarItems } from '@core/datas/sidebar-items';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sideBarOpenClose],
  imports: [RouterLink, RouterLinkActive, LucideAngularModule]
})
export class SidebarComponent {
  public useSideBar = inject(SideBarContext);

  default = SidebarItems;

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
