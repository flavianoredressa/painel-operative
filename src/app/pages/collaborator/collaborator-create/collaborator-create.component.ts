import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { errorTailorImports } from '@ngneat/error-tailor';
import { CollaboratorRepository } from '@repositories/collaborator.repository';
import { parse } from 'date-fns';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-collaborator-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective, DatePipe],
  templateUrl: './collaborator-create.component.html'
})
export class CollaboratorCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private collaboratorRepository = inject(CollaboratorRepository);

  idCollaborator = getRouterParam('id');

  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    admission_date: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });

  ngOnInit() {
    try {
      if (this.idCollaborator) {
        this.loading.set(true);
        // const collaborator = await this.collaboratorRepository.getStatusById(this.idCollaborator);
        // this.formGroup.patchValue(collaborator);
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
      const { admission_date, active } = this.formGroup.value;
      const collaborator = {
        active,
        admission_date: parse(admission_date, 'yyyy-MM-dd', new Date()),
        birth_date: parse(admission_date, 'yyyy-MM-dd', new Date())
      };

      if (!this.idCollaborator) {
        await this.collaboratorRepository.create(collaborator);
      } else {
        await this.collaboratorRepository.update(this.idCollaborator, collaborator);
      }
      this.toastrService.success(`Colaborador ${!this.idCollaborator ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/collaborator');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
