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
  selector: 'app-list-user-types',
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
    const projectType = this.list();
    return projectType.length === 1 && projectType[0] === null;
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
      message: 'Você tem certeza que quer excluir o Tipo de projeto	?',
      textCancel: 'Voltar',
      textConfirm: 'Excluir'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        await this.userTypesRepository.delete(id);
        const index = this.list().findIndex((userTypes: UserTypes) => userTypes.id === id);
        this.list().splice(index, 1);
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }
}
