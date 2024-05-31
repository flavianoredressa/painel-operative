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
        path: 'list-status-sales',
        title: 'Status de Vendas',
        loadComponent: () =>
          import('../pages/status-sale/satus-sale-list/satus-sale-list.component').then(c => c.SatusSaleListComponent)
      },
      {
        path: 'create-status-sales',
        title: 'Status de Vendas',
        loadComponent: () =>
          import('../pages/status-sale/satus-sale-create/satus-sale-create.component').then(
            c => c.SatusSaleCreateComponent
          )
      },
      {
        path: 'create-status-sales/:id/edit',
        title: 'Status de Vendas',
        loadComponent: () =>
          import('../pages/status-sale/satus-sale-create/satus-sale-create.component').then(
            c => c.SatusSaleCreateComponent
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthenticatedRoutingModule {}
