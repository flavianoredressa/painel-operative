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
      // {
      //   path: 'admins',
      //   title: 'Administradores',
      //   loadChildren: () => import('../pages/admins/admin.module').then(m => m.AdminModule)
      // },
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
        path: 'activities',
        title: 'Atividades',
        loadComponent: () =>
          import('../pages/activity/activity-list/activity-list.component').then(
            c => c.ActivityListComponent
          )
      },
      {
        path: 'create-activities',
        title: 'Atividades',
        loadComponent: () =>
          import('../pages/activity/activity-create/activity-create.component').then(
            c => c.ActivityCreateComponent
          )
      },
      {
        path: 'create-activity/:id/edit',
        title: 'Atividades',
        loadComponent: () =>
          import('../pages/activity/activity-create/activity-create.component').then(
            c => c.ActivityCreateComponent
          )
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthenticatedRoutingModule {}
