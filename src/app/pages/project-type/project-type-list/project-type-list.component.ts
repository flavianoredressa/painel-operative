import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ModalConfirmationService } from '@components/modals/modal-confirmation/modal-confirmation.service';
import { ProjectType } from '@models/project-type';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectTypeRepository } from '@repositories/project-type.repository';
import { LucideAngularModule } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';
import { ProjectTypeCreateComponent } from '../project-type-create/project-type-create.component';

@Component({
  selector: 'app-list-project-type',
  standalone: true,
  imports: [RouterLink, NgbPaginationModule, DatePipe, FormsModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './project-type-list.component.html'
})
export class ProjectTypeListComponent implements OnInit {
  modalConfirmationService = inject(ModalConfirmationService);
  projectTypeRepository = inject(ProjectTypeRepository);
  builder = inject(FormBuilder);
  toastr = inject(ToastrService);
  ngbModal = inject(NgbModal);

  protected formSearch = this.builder.group({
    term: ['']
  });

  list = signal([null]);

  searchTerm = toSignal(this.formSearch.controls.term.valueChanges, { initialValue: '' });

  isLoading = computed(() => {
    const projectType = this.list();
    return projectType.length === 1 && projectType[0] === null;
  });

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.list().filter(
      (item: ProjectType) => (item && item.name.toLowerCase().includes(term)) || item.id.toString().includes(term)
    );
  });

  async ngOnInit() {
    const projectTypes = await this.projectTypeRepository.getAll();
    this.list.set(projectTypes);
  }

  async delete(id: string) {
    const modalOptions = {
      title: 'Confirmação',
      message: 'Você tem certeza que quer excluir o Tipo de projeto	?',
      textCancel: 'Voltar',
      textConfirm: 'Excluir'
    };

    const res = await this.modalConfirmationService.open(modalOptions);

    if (res) {
      try {
        await this.projectTypeRepository.delete(id);
        const index = this.list().findIndex((projectType: ProjectType) => projectType.id === id);
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
          name: this.list().find((projectType: ProjectType) => projectType.id === id).name,
          active: !this.list().find((projectType: ProjectType) => projectType.id === id).active
        };
        await this.projectTypeRepository.update(id, status);
        const projectType = this.list().find((projectType: ProjectType) => projectType.id === id);
        projectType.active = !projectType.active;
      } catch (e) {
        if (e instanceof ApiError) {
          this.toastr.error(e.message);
        }
      }
    }
  }

  openModal() {
    const modal = this.ngbModal.open(ProjectTypeCreateComponent, {
      centered: true,
      size: 'md'
    });

    modal.result.then(async res => {
      if (res) {
        const projectTypes = await this.projectTypeRepository.getAll();
        this.list.set(projectTypes);
      }
    });
  }
}
