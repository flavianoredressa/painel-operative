import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ImgFallbackDirective, ShortNamePipe } from '@burand/angular';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LucideAngularModule } from 'lucide-angular';

import { SessionContext } from '@contexts/session.context';
import { SideBarContext } from '@contexts/side-bar-context';
import { environment } from '@environment';

@Component({
  standalone: true,
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbDropdownModule, LucideAngularModule, ShortNamePipe, ImgFallbackDirective]
})
export class TopbarComponent {
  private router = inject(Router);
  private useSession = inject(SessionContext);
  public useSideBar = inject(SideBarContext);

  version = environment.appVersion;
  currentUser = this.useSession.getLoggedUser;

  async logout() {
    await this.useSession.logout();
    await this.router.navigateByUrl('/login');
  }
}
