import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { PaymentMethod } from '@models/payment-method';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentMethodRepository } from '@repositories/payment-method.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-payment-method',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './payment-method-list.component.html'
})
export class PaymentMethodListComponent {
  modalConfirmationService = inject(ModalConfirmationService);
  PaymentMethodRepository = inject(PaymentMethodRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = toSignal(this.PaymentMethodRepository.getAll(), { initialValue: [null] });

  searchTerm = toSignal(this.formSearch.controls.term.valueChanges, { initialValue: '' });

  isLoading = computed(() => {
    const paymentMethod = this.list();
    return paymentMethod.length === 1 && paymentMethod[0] === null;
  });

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.list().filter(
      (item: PaymentMethod) => (item && item.name.toLowerCase().includes(term)) || item.id.toString().includes(term)
    );
  });

  async delete(id: string) {
    const modalOptions = {
      title: 'Confirmação',
      message: 'Você tem certeza que quer excluir o Método de pagamento?',
      textCancel: 'Voltar',
      textConfirm: 'Excluir'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        await this.PaymentMethodRepository.delete(id);
        const index = this.list().findIndex((paymentMethod: PaymentMethod) => paymentMethod.id === id);
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
          name: this.list().find((paymentMethod: PaymentMethod) => paymentMethod.id === id).name,
          active: !this.list().find((paymentMethod: PaymentMethod) => paymentMethod.id === id).active
        };
        await this.PaymentMethodRepository.update(id, status);
        const paymentMethod = this.list().find((paymentMethod: PaymentMethod) => paymentMethod.id === id);
        paymentMethod.active = !paymentMethod.active;
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }
}
