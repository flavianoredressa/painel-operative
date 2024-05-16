import { Component, computed, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { toSignal } from '@angular/core/rxjs-interop';
import { ApiError } from '@burand/angular';
import { ModalConfirmationComponent } from '@components/modals/modal-confirmation/modal-confirmation.component';
import { UserTypeLabel } from '@enums/user-type';
import { Admin } from '@models/admin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  ngbModal = inject(NgbModal);

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

  delete(id: string) {
    const modalRef = this.ngbModal.open(ModalConfirmationComponent, {
      backdrop: 'static',
      centered: true,
      keyboard: false,
      windowClass: 'custom-modal'
    });

    modalRef.componentInstance.title = 'Confirmação';
    modalRef.componentInstance.message = 'Você tem certeza que quer exlcuir o administrador?';
    modalRef.componentInstance.textCancel = 'Voltar';
    modalRef.componentInstance.textConfirm = 'Excluir';

    modalRef.result.then(async res => {
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
    });
  }
}
