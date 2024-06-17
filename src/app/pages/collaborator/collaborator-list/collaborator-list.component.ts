import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { Collaborator } from '@models/collaborator';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CollaboratorRepository } from '@repositories/collaborator.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-collaborator',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './collaborator-list.component.html'
})
export class CollaboratorListComponent {
  modalConfirmationService = inject(ModalConfirmationService);
  collaboratorRepository = inject(CollaboratorRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = toSignal(this.collaboratorRepository.getAll(), { initialValue: [null] });

  searchTerm = toSignal(this.formSearch.controls.term.valueChanges, { initialValue: '' });

  isLoading = computed(() => {
    const collaborator = this.list();
    return collaborator.length === 1 && collaborator[0] === null;
  });

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.list().filter((item: Collaborator) => {
      return item.id.toString().includes(term);
    });
  });

  formatDate(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  }

  async delete(id: string) {
    const modalOptions = {
      title: 'Confirmação',
      message: 'Você tem certeza que quer excluir o Colaborador?',
      textCancel: 'Voltar',
      textConfirm: 'Excluir'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        await this.collaboratorRepository.delete(id);
        const index = this.list().findIndex((collaborator: Collaborator) => collaborator.id === id);
        this.filteredList().splice(index, 1);
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }
}
