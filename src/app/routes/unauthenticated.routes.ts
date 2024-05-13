import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@layouts/layout.component';

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
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      {
        path: '',
        title: 'Dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UnauthenticatedRoutingModule {}
