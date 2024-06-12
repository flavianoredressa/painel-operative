import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { Activity } from '@models/activity';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivityRepository } from '@repositories/activity.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-activity',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './activity-list.component.html'
})
export class ActivityListComponent {
  modalConfirmationService = inject(ModalConfirmationService);
  activityRepository = inject(ActivityRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = toSignal(this.activityRepository.getAll(), { initialValue: [null] });

  searchTerm = toSignal(this.formSearch.controls.term.valueChanges, { initialValue: '' });

  isLoading = computed(() => {
    const activity = this.list();
    return activity.length === 1 && activity[0] === null;
  });

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.list().filter(
      (item: Activity) => (item && item.name.toLowerCase().includes(term)) || item.id.toString().includes(term)
    );
  });

  async delete(id: string) {
    const modalOptions = {
      title: 'Confirmação',
      message: 'Você tem certeza que quer excluir a Atividade?',
      textCancel: 'Voltar',
      textConfirm: 'Excluir'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        await this.activityRepository.delete(id);
        const index = this.list().findIndex((activity: Activity) => activity.id === id);
        this.list().splice(index, 1);
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }

  async changeStatus(id: string) {
    console.log(id);
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
          name: this.list().find((activity: Activity) => activity.id === id).name,
          active: !this.list().find((activity: Activity) => activity.id === id).active
        };
        await this.activityRepository.update(id, status);
        const activity = this.list().find((activity: Activity) => activity.id === id);
        activity.active = !activity.active;
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }
}
