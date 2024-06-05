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
        path: 'journey',
        title: 'Jornada',
        loadComponent: () =>
          import('../pages/journey/journey-list/journey-list.component').then(c => c.JourneyListComponent)
      },
      {
        path: 'journey-create',
        title: 'Jornada da criação',
        loadComponent: () =>
          import('../pages/journey/journey-create/journey-create.component').then(c => c.JourneyCreateComponent)
      },
      {
        path: 'journey-create/:id/edit',
        title: 'Jornada da criação edit',
        loadComponent: () =>
          import('../pages/journey/journey-create/journey-create.component').then(c => c.JourneyCreateComponent)
      },
      {
        path: 'payment-method',
        title: 'Metódo de Pagamento',
        loadComponent: () =>
          import('../pages/payment-method/payment-method-list/payment-method-list.component').then(
            c => c.PaymentMethodListComponent
          )
      },
      {
        path: 'payment-method-create',
        title: 'Metódo de Pagamento',
        loadComponent: () =>
          import('../pages/payment-method/payment-method-create/payment-method-create.component').then(
            c => c.PaymentMethodCreateComponent
          )
      },
      {
        path: 'payment-method-create/:id/edit',
        title: 'Metódo de Pagamento edit',
        loadComponent: () =>
          import('../pages/payment-method/payment-method-create/payment-method-create.component').then(
            c => c.PaymentMethodCreateComponent
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthenticatedRoutingModule {}
