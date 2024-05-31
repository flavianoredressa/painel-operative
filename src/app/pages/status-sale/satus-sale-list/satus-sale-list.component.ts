import { DatePipe, JsonPipe, SlicePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { Pagination } from '@interfaces/pagination';
import { StatusSale } from '@models/status-sale';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusSaleRepository } from '@repositories/status-sale.repository';

@Component({
  selector: 'app-list-status-sale',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, SlicePipe, DatePipe, JsonPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './satus-sale-list.component.html'
})
export class SatusSaleListComponent implements OnInit {
  // private destroy$ = new Subject<void>();
  private statusSaleRepository = inject(StatusSaleRepository);
  builder = inject(FormBuilder);
  modalConfirmationService = inject(ModalConfirmationService);

  originalList: StatusSale[] = [];
  list: StatusSale[] = [];
  term: string = '';

  start: number;
  end: number;

  pagination: Pagination = {
    page: 1,
    perPage: 7,
    total: 0,
    totalPages: 1
  };

  isLoading = false;

  protected formSearch = this.builder.group({
    term: ['']
  });

  async ngOnInit() {
    this.list = await this.statusSaleRepository.getAll();
    // this.formSearch.controls.term.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
    //   if (value) {
    //     this.filterList(value);
    //   }
    //   this.calculatePagination();
    //   this.calculateItemsPagination();
    // });
    // this.calculatePagination();
    // this.calculateItemsPagination();
  }

  // ngOnDestroy(): void {
  //   // this.destroy$.next();
  //   // this.destroy$.complete();
  // }

  // filterList(term: string) {
  //   // if (!term) {
  //   //   // Se o termo de pesquisa estiver vazio, mostrar a lista original
  //   //   this.list = this.originalList;
  //   // } else {
  //   //   // Filtrar a lista original com base no termo de pesquisa
  //   //   this.list = this.originalList.filter(item => item.name.toLowerCase().includes(term.toLowerCase()));
  //   // }
  //   // console.log('Filtrar lista', term);
  //   // // Recalcular a paginação e os itens da paginação
  //   // this.calculatePagination();
  //   // this.calculateItemsPagination();
  // }

  async delete(id: string | number) {
    const modalOptions = {
      title: 'Confirmação',
      message: 'Você tem certeza que quer excluir o administrador?',
      textCancel: 'Voltar',
      textConfirm: 'Excluir'
    };
    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      console.log('Executar ação', id);
      // const index = lista.findIndex(admin => admin.id === id);
      // lista.splice(index, 1);
    }
  }

  calculatePagination() {
    this.pagination.totalPages = Math.ceil(this.list.length / this.pagination.perPage);
    this.pagination.total = this.list.length;
  }

  calculateItemsPagination() {
    this.start = (this.pagination.page - 1) * this.pagination.perPage;
    this.end = this.start + this.pagination.perPage;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageChange(event: any) {
    this.isLoading = true;
    this.pagination.page = event;
    this.calculateItemsPagination();
    this.isLoading = false;
  }

  nextPage() {
    if (this.pagination.page < this.pagination.totalPages) {
      this.pageChange(this.pagination.page + 1);
    }
  }
}
