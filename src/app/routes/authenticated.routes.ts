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
      },
      {
        path: 'activities',
        title: 'Atividades',
        loadComponent: () =>
          import('../pages/activity/activity-list/activity-list.component').then(c => c.ActivityListComponent)
      },
      {
        path: 'create-activities',
        title: 'Atividades',
        loadComponent: () =>
          import('../pages/activity/activity-create/activity-create.component').then(c => c.ActivityCreateComponent)
      },
      {
        path: 'create-activities/:id/edit',
        title: 'Atividades',
        loadComponent: () =>
          import('../pages/activity/activity-create/activity-create.component').then(c => c.ActivityCreateComponent)
      },
      {
        path: 'cost-center',
        title: 'Centro de Custos',
        loadComponent: () =>
          import('../pages/cost-center/cost-center-list/cost-center-list.component').then(
            c => c.CostCenterListComponent
          )
      },
      {
        path: 'create-cost-center',
        title: 'Centro de Custos',
        loadComponent: () =>
          import('../pages/cost-center/cost-center-create/cost-center-create.component').then(
            c => c.CostCenterCreateComponent
          )
      },
      {
        path: 'create-cost-center/:id/edit',
        title: 'Centro de Custos',
        loadComponent: () =>
          import('../pages/cost-center/cost-center-create/cost-center-create.component').then(
            c => c.CostCenterCreateComponent
          )
      },
      {
        path: 'project-type',
        title: 'Tipo de Projeto',
        loadComponent: () =>
          import('../pages/project-type/project-type-list/project-type-list.component').then(
            c => c.ProjectTypeListComponent
          )
      },
      {
        path: 'create-project-type',
        title: 'Tipo de Projeto',
        loadComponent: () =>
          import('../pages/project-type/project-type-create/project-type-create.component').then(
            c => c.ProjectTypeCreateComponent
          )
      },
      {
        path: 'create-project-type/:id/edit',
        title: 'Tipo de Projeto',
        loadComponent: () =>
          import('../pages/project-type/project-type-create/project-type-create.component').then(
            c => c.ProjectTypeCreateComponent
          )
      },
      {
        path: 'charge-type',
        title: 'Tipo de Cobrança',
        loadComponent: () =>
          import('../pages/charge-type/charge-type-list/charge-type-list.component').then(
            c => c.ChargeTypeListComponent
          )
      },
      {
        path: 'create-charge-type',
        title: 'Tipo de Projeto',
        loadComponent: () =>
          import('../pages/charge-type/charge-type-create/charge-type-create.component').then(
            c => c.ChargeTypeCreateComponent
          )
      },
      {
        path: 'create-charge-type/:id/edit',
        title: 'Tipo de Projeto',
        loadComponent: () =>
          import('../pages/charge-type/charge-type-create/charge-type-create.component').then(
            c => c.ChargeTypeCreateComponent
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthenticatedRoutingModule {}
