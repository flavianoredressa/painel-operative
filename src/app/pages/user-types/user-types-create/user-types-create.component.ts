import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoadingDirective, getRouterParam } from '@burand/angular';
import { InputComponent } from '@forms/input/input.component';
import { errorTailorImports } from '@ngneat/error-tailor';
import { UserTypesRepository } from '@repositories/user-types.repository';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-satus-sale-create',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, errorTailorImports, IsLoadingDirective],
  templateUrl: './user-types-create.component.html'
})
export class UserTypesCreateComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private userTypesRepository = inject(UserTypesRepository);

  idUserTypes = getRouterParam('id');

  loading = signal(false);
  submitting = signal(false);

  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    active: [true, [Validators.required]]
  });

  async ngOnInit() {
    try {
      if (this.idUserTypes) {
        this.loading.set(true);
        const userTypes = await this.userTypesRepository.getStatusById(this.idUserTypes);
        this.formGroup.patchValue(userTypes);
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
      const userTypes = {
        active,
        name
      };

      if (!this.idUserTypes) {
        await this.userTypesRepository.create(userTypes);
      } else {
        await this.userTypesRepository.update(this.idUserTypes, userTypes);
      }
      this.toastrService.success(`User Types ${!this.idUserTypes ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/user-types');
    } catch (error) {
      this.toastrService.error('Não foi possível salvar os dados.');
      console.error(error);
    } finally {
      this.submitting.set(false);
    }
  }
}
