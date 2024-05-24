import { JsonPipe, SlicePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { mockProducts } from '@core/datas/products';
import { Pagination } from '@interfaces/pagination';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';

export interface Product {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  estoque: number;
  descricao: string;
  marca: string;
  avaliacao: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, SlicePipe, JsonPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  builder = inject(FormBuilder);

  originalList: Product[] = mockProducts;
  list: Product[] = [...this.originalList];

  term: string = '';

  start: number;
  end: number;

  pagination: Pagination = {
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 1
  };

  isLoading = false;

  protected formSearch = this.builder.group({
    term: ['']
  });

  ngOnInit() {
    this.formSearch.controls.term.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (!value) {
        this.list = this.originalList;
      } else {
        this.filterList(value);
      }
      this.calculatePagination();
      this.calculateItemsPagination();
    });
    this.calculatePagination();
    this.calculateItemsPagination();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterList(term: string) {
    if (!term) {
      // Se o termo de pesquisa estiver vazio, mostrar a lista original
      this.list = this.originalList;
    } else {
      // Filtrar a lista original com base no termo de pesquisa
      this.list = this.originalList.filter(item => item.nome.toLowerCase().includes(term.toLowerCase()));
    }
    // Recalcular a paginação e os itens da paginação
    this.calculatePagination();
    this.calculateItemsPagination();
  }

  delete(id: number) {
    console.log(id);
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
