import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { ChargeType } from '@models/charge-type';
import { ProjectType } from '@models/project-type';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ChargeTypeRepository } from '@repositories/charge-type.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-charge-type',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './charge-type-list.component.html'
})
export class ChargeTypeListComponent {
  modalConfirmationService = inject(ModalConfirmationService);
  chargeTypeRepository = inject(ChargeTypeRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = toSignal(this.chargeTypeRepository.getAll(), { initialValue: [null] });

  searchTerm = toSignal(this.formSearch.controls.term.valueChanges, { initialValue: '' });

  isLoading = computed(() => {
    const chargeType = this.list();
    return chargeType.length === 1 && chargeType[0] === null;
  });

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.list().filter(
      (item: ProjectType) => (item && item.name.toLowerCase().includes(term)) || item.id.toString().includes(term)
    );
  });

  async delete(id: string) {
    const modalOptions = {
      title: 'Confirmação',
      message: 'Você tem certeza que quer excluir o Tipo de Cobrança?',
      textCancel: 'Voltar',
      textConfirm: 'Excluir'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        await this.chargeTypeRepository.delete(id);
        const index = this.list().findIndex((chargeType: ChargeType) => chargeType.id === id);
        this.list().splice(index, 1);
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
          name: this.list().find((chargeType: ChargeType) => chargeType.id === id).name,
          active: !this.list().find((chargeType: ChargeType) => chargeType.id === id).active
        };
        await this.chargeTypeRepository.update(id, status);
        const chargeType = this.list().find((chargeType: ChargeType) => chargeType.id === id);
        chargeType.active = !chargeType.active;
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }
}
