import { DatePipe, JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { StatusTask } from '@models/status-task';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusTaskRepository } from '@repositories/status-task.repository';
import { LucideAngularModule } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-status-task',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule, JsonPipe, LucideAngularModule],
  templateUrl: './status-task-list.component.html'
})
export class StatusTaskListComponent {
  modalConfirmationService = inject(ModalConfirmationService);
  statusTaskRepository = inject(StatusTaskRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = toSignal(this.statusTaskRepository.getAll(), { initialValue: [] });
  searchTerm = toSignal(this.formSearch.controls.term.valueChanges, { initialValue: '' });

  isLoading = computed(() => {
    const statusTask = this.list();
    return statusTask?.length === 1 && statusTask[0] === null;
  });

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const list = this.list();

    if (list) {
      return list.filter(
        (item: StatusTask) => (item && item.name.toLowerCase().includes(term)) || item.id.toString().includes(term)
      );
    }
    return [];
  });

  async delete(id: string) {
    const modalOptions = {
      title: 'Confirmação',
      message: 'Você tem certeza que quer excluir o Status de tarefas?',
      textCancel: 'Voltar',
      textConfirm: 'Excluir'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        await this.statusTaskRepository.delete(id);
        const index = this.list().findIndex((statusTask: StatusTask) => statusTask.id === id);
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
      message: 'Você tem certeza que quer mudar o Método de pagamento?',
      textCancel: 'Voltar',
      textConfirm: 'Sim',
      colorButton: '!bg-[#2d9c7f]'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        const status = {
          name: this.list().find((statusTask: StatusTask) => statusTask.id === id).name,
          active: !this.list().find((statusTask: StatusTask) => statusTask.id === id).active
        };
        await this.statusTaskRepository.update(id, status);
        const statusTask = this.list().find((statusTask: StatusTask) => statusTask.id === id);
        statusTask.active = !statusTask.active;
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }
}
