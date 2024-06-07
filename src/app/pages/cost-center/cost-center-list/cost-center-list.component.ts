import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { CostCenter } from '@models/cost-center';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CostCenterRepository } from '@repositories/cost-center.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-cost-center',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './cost-center-list.component.html'
})
export class CostCenterListComponent {
  modalConfirmationService = inject(ModalConfirmationService);
  costCenterRepository = inject(CostCenterRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = toSignal(this.costCenterRepository.getAll(), { initialValue: [null] });

  searchTerm = toSignal(this.formSearch.controls.term.valueChanges, { initialValue: '' });

  isLoading = computed(() => {
    const costCenter = this.list();
    return costCenter.length === 1 && costCenter[0] === null;
  });

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.list().filter(
      (item: CostCenter) => (item && item.name.toLowerCase().includes(term)) || item.id.toString().includes(term)
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
        await this.costCenterRepository.delete(id);
        const index = this.list().findIndex((costCenter: CostCenter) => costCenter.id === id);
        this.list().splice(index, 1);
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }
}
