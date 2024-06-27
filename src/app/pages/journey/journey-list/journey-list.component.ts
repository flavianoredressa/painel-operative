import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { Journey } from '@models/journey';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { JourneyRepository } from '@repositories/journey.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-journey',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './journey-list.component.html'
})
export class JourneyListComponent {
  modalConfirmationService = inject(ModalConfirmationService);
  journeysRepository = inject(JourneyRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = toSignal(this.journeysRepository.getAll(), { initialValue: [null] });

  searchTerm = toSignal(this.formSearch.controls.term.valueChanges, { initialValue: '' });

  isLoading = computed(() => {
    const journeys = this.list();
    return journeys.length === 1 && journeys[0] === null;
  });

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.list().filter(
      (item: Journey) => (item && item.name.toLowerCase().includes(term)) || item.id.toString().includes(term)
    );
  });

  async delete(id: string) {
    const modalOptions = {
      title: 'Confirmação',
      message: 'Você tem certeza que quer excluir a Jornada?',
      textCancel: 'Voltar',
      textConfirm: 'Excluir'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        await this.journeysRepository.delete(id);
        const index = this.list().findIndex((journey: Journey) => journey.id === id);
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
      message: 'Você tem certeza que quer mudar a Jornada?',
      textCancel: 'Voltar',
      textConfirm: 'Sim',
      colorButton: '!bg-[#2d9c7f]'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        const status = {
          name: this.list().find((journey: Journey) => journey.id === id).name,
          active: !this.list().find((journey: Journey) => journey.id === id).active
        };
        await this.journeysRepository.update(id, status);
        const journey = this.list().find((journey: Journey) => journey.id === id);
        journey.active = !journey.active;
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }
}
