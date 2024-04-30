import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'login',
    title: 'Login | $NOME_SEU_SITE_TITLE',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    title: 'Recuperar a senha | $NOME_SEU_SITE_TITLE',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    title: 'Redefinir a senha | $NOME_SEU_SITE_TITLE',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
