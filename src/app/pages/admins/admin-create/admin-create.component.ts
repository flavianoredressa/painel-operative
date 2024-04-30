import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ToastrService } from 'ngx-toastr';

import { AdminRepository } from '@repositories/admin.repository';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html'
})
export class AdminComponent {
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private _admin = inject(AdminRepository);
  private router = inject(Router);

  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  submitting = false;

  async handleSubmit() {
    if (this.formGroup.invalid) {
      this.toastr.error('Não foi possível salvar os dados.');

      return;
    }

    this.submitting = true;

    try {
      const { email, name } = this.formGroup.value;

      await this._admin.add({
        email,
        name
      });

      this.toastr.success('Administrador cadastrado com sucesso.');
      this.router.navigateByUrl('/admins');
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'Ocorreu um erro ao cadastrar usuário.';
      this.toastr.error(errorMessage);
    }

    this.submitting = false;
  }
}
