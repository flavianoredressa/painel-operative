import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { Checklist } from '@models/checklist';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ChecklistRepository } from '@repositories/checklist.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './checklist-list.component.html'
})
export class CheckListComponent {
  modalConfirmationService = inject(ModalConfirmationService);
  ChecklistRepository = inject(ChecklistRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = toSignal(this.ChecklistRepository.getAll(), { initialValue: [null] });

  searchTerm = toSignal(this.formSearch.controls.term.valueChanges, { initialValue: '' });

  isLoading = computed(() => {
    const checklist = this.list();
    return checklist.length === 1 && checklist[0] === null;
  });

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.list().filter(
      (item: Checklist) => (item && item.name.toLowerCase().includes(term)) || item.id.toString().includes(term)
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
        await this.ChecklistRepository.delete(id);
        const index = this.list().findIndex((checklist: Checklist) => checklist.id === id);
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
      message: 'Você tem certeza que quer mudar a Atividade?',
      textCancel: 'Voltar',
      textConfirm: 'Sim',
      colorButton: '!bg-[#2d9c7f]'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        const status = {
          name: this.list().find((checklist: Checklist) => checklist.id === id).name,
          active: !this.list().find((checklist: Checklist) => checklist.id === id).active
        };
        await this.ChecklistRepository.update(id, status);
        const checklist = this.list().find((checklist: Checklist) => checklist.id === id);
        checklist.active = !checklist.active;
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }
}
