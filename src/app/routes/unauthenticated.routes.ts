import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('../pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('../pages/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UnauthenticatedRoutingModule {}
