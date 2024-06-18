import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { UserTypes } from '@models/user-types';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UserTypesRepository } from '@repositories/user-types.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-user-type',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './user-types-list.component.html'
})
export class UserTypesListComponent {
  modalConfirmationService = inject(ModalConfirmationService);
  userTypesRepository = inject(UserTypesRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = toSignal(this.userTypesRepository.getAll(), { initialValue: [null] });

  searchTerm = toSignal(this.formSearch.controls.term.valueChanges, { initialValue: '' });

  isLoading = computed(() => {
    const userTypes = this.list();
    return userTypes.length === 1 && userTypes[0] === null;
  });

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.list().filter(
      (item: UserTypes) => (item && item.name.toLowerCase().includes(term)) || item.id.toString().includes(term)
    );
  });

  async delete(id: string) {
    const modalOptions = {
      title: 'Confirmação',
      message: 'Você tem certeza que quer excluir o Status de vendas?',
      textCancel: 'Voltar',
      textConfirm: 'Excluir'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        await this.userTypesRepository.delete(id);
        const index = this.list().findIndex((userType: UserTypes) => userType.id === id);
        this.filteredList().splice(index, 1);
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }

  async changeStatus(id: string) {
    const modalOptions = {
      title: 'Confirmação',
      message: 'Você tem certeza que quer mudar o Status de vendas?',
      textCancel: 'Voltar',
      textConfirm: 'Sim',
      colorButton: '!bg-[#2d9c7f]'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        const status = {
          name: this.list().find((userType: UserTypes) => userType.id === id).name,
          active: !this.list().find((userType: UserTypes) => userType.id === id).active
        };
        await this.userTypesRepository.update(id, status);
        const userType = this.list().find((userType: UserTypes) => userType.id === id);
        userType.active = !userType.active;
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }
}
