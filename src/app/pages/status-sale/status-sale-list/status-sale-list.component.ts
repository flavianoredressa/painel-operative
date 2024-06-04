import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { StatusSale } from '@models/status-sale';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusSaleRepository } from '@repositories/status-sale.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-status-sale',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './status-sale-list.component.html'
})
export class StatusSaleListComponent {
  modalConfirmationService = inject(ModalConfirmationService);
  statusSalesRepository = inject(StatusSaleRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = toSignal(this.statusSalesRepository.getAll(), { initialValue: [null] });

  searchTerm = toSignal(this.formSearch.controls.term.valueChanges, { initialValue: '' });

  isLoading = computed(() => {
    const statusSales = this.list();
    return statusSales?.length === 1 && statusSales[0] === null;
  });

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    console.log(this.list());
    console.log('term: ', term);
    if (!term) {
      return this.list().filter((item: undefined) => item);
    }

    return this.list().filter(
      (item: StatusSale) => (item && item.name.toLowerCase().includes(term)) || item.id.toString().includes(term)
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
        await this.statusSalesRepository.delete(id);
        const index = this.list().findIndex((statusSale: StatusSale) => statusSale.id === id);
        this.list().splice(index, 1);
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }
}
