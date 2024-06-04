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
        path: 'products',
        title: 'Produtos',
        loadComponent: () => import('../pages/products/products.component').then(c => c.ProductsComponent)
      },
      {
        path: 'status-sales',
        title: 'Status de Vendas',
        loadComponent: () =>
          import('../pages/status-sale/status-sale-list/status-sale-list.component').then(
            c => c.StatusSaleListComponent
          )
      },
      {
        path: 'create-status-sales',
        title: 'Status de Vendas',
        loadComponent: () =>
          import('../pages/status-sale/status-sale-create/status-sale-create.component').then(
            c => c.SatusSaleCreateComponent
          )
      },
      {
        path: 'create-status-sales/:id/edit',
        title: 'Status de Vendas',
        loadComponent: () =>
          import('../pages/status-sale/status-sale-create/status-sale-create.component').then(
            c => c.SatusSaleCreateComponent
          )
      },
      {
        path: 'status-task',
        title: 'Status de Tarefa',
        loadComponent: () =>
          import('../pages/status-task/status-task-list/status-task-list.component').then(
            c => c.StatusTaskListComponent
          )
      },
      {
        path: 'create-status-task',
        title: 'Status de Tarefa',
        loadComponent: () =>
          import('../pages/status-task/status-task-create/status-task-create.component').then(
            c => c.StatusTaskCreateComponent
          )
      },
      {
        path: 'create-status-task/:id/edit',
        title: 'Status de Tarefa',
        loadComponent: () =>
          import('../pages/status-task/status-task-create/status-task-create.component').then(
            c => c.StatusTaskCreateComponent
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthenticatedRoutingModule {}
