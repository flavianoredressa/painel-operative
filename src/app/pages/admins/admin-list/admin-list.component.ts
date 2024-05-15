import { Component, computed, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { toSignal } from '@angular/core/rxjs-interop';
import { UserTypeLabel } from '@enums/user-type';
import { Admin } from '@models/admin';
import { AdminRepository } from '@repositories/admin.repository';
import { UserRepository } from '@repositories/user.repository';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html'
})
export class AdminListComponent {
  loading = true;
  UserTypeLabel = UserTypeLabel;

  userRepository = inject(UserRepository);
  _admin = inject(AdminRepository);
  toastr = inject(ToastrService);

  trackById(_: number, item: Admin) {
    return item.id;
  }

  list = toSignal(this._admin.getAll(), {
    initialValue: [null]
  });

  isLoading = computed(() => {
    const admins = this.list();
    return admins.length === 1 && admins[0] === null;
  });
}
