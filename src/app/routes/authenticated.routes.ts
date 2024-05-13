import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '@layouts/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'admins',
        title: 'Administradores',
        loadChildren: () => import('../pages/admins/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'workflows',
        title: 'Workflows',
        loadComponent: () => import('../pages/workflows/workflows.page').then(m => m.WorkflowsPage)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthenticatedRoutingModule {}
