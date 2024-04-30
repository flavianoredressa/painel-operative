import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppError } from '@burand/angular/exceptions';
import { emailValidator } from '@burand/angular/validators';
import { ToastrService } from 'ngx-toastr';

import { SessionContext } from '@contexts/session.context';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.scss']
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService);
  private authService = inject(AuthService);
  private sessionContext = inject(SessionContext);

  loginForm: FormGroup;
  submitted = false;
  loading = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator]],
      password: [null, Validators.required]
    });
  }

  async onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    try {
      const { email, password } = this.loginForm.value;

      const canLogin = await this.authService.canLogin(email);
      if (!canLogin) {
        throw new AppError('Erro!', 'Este usuário não tem permissões para realizar o login');
      }

      await this.authService.signin(email, password);
      await this.sessionContext.fetchLoggedUser();

      this.router.navigateByUrl('/dashboard', {
        replaceUrl: true
      });
    } catch (error) {
      if (error instanceof AppError) {
        this.toastrService.error(error.message, error.title);
      } else {
        this.toastrService.error('O e-mail ou senha está inválido.', 'Erro!');
      }
    }

    this.loading = false;
  }
}
