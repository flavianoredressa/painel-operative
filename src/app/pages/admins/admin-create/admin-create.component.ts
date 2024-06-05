import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiError } from '@burand/angular';
import { ToastrService } from 'ngx-toastr';

import { AdminRepository } from '@repositories/admin.repository';
import { UserRepository } from '@repositories/user.repository';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html'
})
export class AdminComponent implements OnInit {
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private _admin = inject(AdminRepository);
  private _user = inject(UserRepository);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  userId = this.activatedRoute.snapshot.paramMap.get('id');

  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  submitting = false;

  isLoading = false;

  async ngOnInit() {
    try {
      if (this.userId) {
        this.isLoading = true;
        const user = await this._user.getUserById(this.userId);
        this.formGroup.patchValue(user);
      }
    } catch (error) {
      this.toastr.error('Não foi possível carregar os dados.');
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async handleSubmit() {
    if (this.formGroup.invalid) {
      this.toastr.error('Não foi possível salvar os dados.');
      return;
    }

    this.submitting = true;

    try {
      const { email, name } = this.formGroup.value;
      const user = {
        email,
        name
      };

      if (!this.userId) {
        await this._admin.add(user);
      } else {
        await this._admin.update(this.userId, user);
      }
      this.toastr.success(`Administrador ${!this.userId ? 'cadastrado' : 'atualizado'} com sucesso.`);
      this.router.navigateByUrl('/admins');
    } catch (error) {
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : `Ocorreu um erro ao ${!this.userId ? 'cadastrar' : 'atualizar'} usuário.`;
      this.toastr.error(errorMessage);
    }

    this.submitting = false;
  }
}
