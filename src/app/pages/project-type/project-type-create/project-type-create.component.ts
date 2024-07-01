import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ProjectTypeRepository } from '@repositories/project-type.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-satus-sale-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, NgSelectModule],
  templateUrl: './project-type-create.component.html'
})
export class ProjectTypeCreateComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private projectTypeRepository = inject(ProjectTypeRepository);
  private ngbActiveModal = inject(NgbActiveModal);

  idProjectType = getRouterParam('id');
  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idProjectType) {
        this.loading.set(true);
        const projectType = await this.projectTypeRepository.getStatusById(this.idProjectType);
        this.formGroup.patchValue(projectType);
        this.loading.set(false);
      }
    } catch (error) {
      this.loading.set(false);
      this.toastrService.error('Não foi possível carregar os dados.');
      console.error(error);
    }
  }

  async handleSubmit() {
    if (this.formGroup.invalid) {
      this.toastrService.error('Verifique os campos e tenta novamente.');
      return;
    }

    this.submitting.set(true);

    try {
      const { name, active } = this.formGroup.value;
      const projectType = {
        active,
        name
      };

      if (!this.idProjectType) {
        await this.projectTypeRepository.create(projectType);
      } else {
        await this.projectTypeRepository.update(this.idProjectType, projectType);
      }
      this.toastrService.success(`Status Sales ${!this.idProjectType ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.ngbActiveModal.close(true);
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }

  close() {
    this.ngbActiveModal.close();
  }
}
