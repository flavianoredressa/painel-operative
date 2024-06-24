import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ProjectTypeRepository } from '@repositories/project-type.repository';
import { ToastrService } from 'ngx-toastr';
import { InputComponent } from '../../../forms/input/input.component';

@Component({
  selector: 'app-project-type-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, NgSelectModule],
  templateUrl: './project-type-create.component.html'
})
export class ProjectTypeCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private projectTypeRepository = inject(ProjectTypeRepository);

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
      this.toastrService.success(`Project Type ${!this.idProjectType ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/project-type');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
