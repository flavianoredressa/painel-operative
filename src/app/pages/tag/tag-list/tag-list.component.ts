import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { Tag } from '@models/tag';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TagRepository } from '@repositories/tag.repository';
import { ToastrService } from 'ngx-toastr';
import { TagCreateComponent } from '../tag-create/tag-create.component';

@Component({
  selector: 'app-list-tag',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './tag-list.component.html'
})
export class TagListComponent implements OnInit {
  modalConfirmationService = inject(ModalConfirmationService);
  tagRepository = inject(TagRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);
  ngbModal = inject(NgbModal);

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = signal([null]);

  searchTerm = toSignal(this.formSearch.controls.term.valueChanges, { initialValue: '' });

  isLoading = computed(() => {
    const tag = this.list();
    return tag?.length && tag.length === 1 && tag[0] === null;
  });

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.list().filter(
      (item: Tag) => (item && item.name.toLowerCase().includes(term)) || item.id.toString().includes(term)
    );
  });

  async ngOnInit() {
    const tag = await this.tagRepository.getAll();
    this.list.set(tag);
  }

  async delete(id: string) {
    const modalOptions = {
      title: 'Confirmação',
      message: 'Você tem certeza que quer excluir a Etiqueta?',
      textCancel: 'Voltar',
      textConfirm: 'Excluir'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        await this.tagRepository.delete(id);
        const index = this.list().findIndex((tag: Tag) => tag.id === id);
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
          name: this.list().find((tag: Tag) => tag.id === id).name,
          active: !this.list().find((tag: Tag) => tag.id === id).active
        };
        await this.tagRepository.update(id, status);
        const tag = this.list().find((tag: Tag) => tag.id === id);
        tag.active = !tag.active;
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }

  openModal() {
    const modal = this.ngbModal.open(TagCreateComponent, {
      centered: true,
      size: 'md'
    });

    modal.result.then(async res => {
      if (res) {
        const tags = await this.tagRepository.getAll();
        this.list.set(tags);
      }
    });
  }
}
