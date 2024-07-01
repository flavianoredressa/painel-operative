import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { Collaborator } from '@models/collaborator';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CollaboratorRepository } from '@repositories/collaborator.repository';
import { ToastrService } from 'ngx-toastr';
import { CollaboratorCreateComponent } from '../collaborator-create/collaborator-create.component';

@Component({
  selector: 'app-list-collaborator',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './collaborator-list.component.html'
})
export class CollaboratorListComponent implements OnInit {
  modalConfirmationService = inject(ModalConfirmationService);
  collaboratorRepository = inject(CollaboratorRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);
  ngbModal = inject(NgbModal);

  currentDate: string;

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = signal([null]);

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

  async ngOnInit() {
    const collaborators = await this.collaboratorRepository.getAll();
    this.list.set(collaborators);
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
          admission_date: this.list().find((collaborator: Collaborator) => collaborator.id === id).admission_date,
          active: !this.list().find((collaborator: Collaborator) => collaborator.id === id).active,
          birth_date: this.list().find((collaborator: Collaborator) => collaborator.id === id).birth_date
        };
        await this.collaboratorRepository.update(id, status);
        const collaborator = this.list().find((collaborator: Collaborator) => collaborator.id === id);
        collaborator.active = !collaborator.active;
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }

  openModal() {
    const modal = this.ngbModal.open(CollaboratorCreateComponent, {
      centered: true,
      size: 'md'
    });

    modal.result.then(async res => {
      if (res) {
        const collaborators = await this.collaboratorRepository.getAll();
        this.list.set(collaborators);
      }
    });
  }
}
