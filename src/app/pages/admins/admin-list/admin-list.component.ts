import { Component, computed, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { toSignal } from '@angular/core/rxjs-interop';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
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
  modalConfirmationService = inject(ModalConfirmationService);

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

  async delete(id: string) {
    if (this.list().length === 1) {
      this.toastr.error('Não é possível remover este admin!');
      return;
    }

    const modalOptions = {
      title: 'Confirmação',
      message: 'Você tem certeza que quer excluir o administrador?',
      textCancel: 'Voltar',
      textConfirm: 'Excluir'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        await this._admin.delete(id);
        const index = this.list().findIndex(admin => admin.id === id);
        this.list().splice(index, 1);
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }
}
