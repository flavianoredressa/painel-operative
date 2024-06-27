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
        path: 'settings',
        title: 'Configuração',
        loadComponent: () => import('../pages/settings/settings.component').then(c => c.SettingsComponent)
      },
      {
        path: 'products',
        title: 'Produtos',
        loadComponent: () => import('../pages/products/products.component').then(c => c.ProductsComponent)
      },
      {
        path: 'status-sales',
        title: 'Status de vendas',
        loadComponent: () =>
          import('../pages/status-sale/status-sale-list/status-sale-list.component').then(
            c => c.StatusSaleListComponent
          )
      },
      {
        path: 'create-status-sales',
        title: 'Cadastrar status de vendas',
        loadComponent: () =>
          import('../pages/status-sale/status-sale-create/status-sale-create.component').then(
            c => c.StatusSaleCreateComponent
          )
      },
      {
        path: 'create-status-sales/:id/edit',
        title: 'Editando status de vendas',
        loadComponent: () =>
          import('../pages/status-sale/status-sale-create/status-sale-create.component').then(
            c => c.StatusSaleCreateComponent
          )
      },
      {
        path: 'status-tasks',
        title: 'Status de tarefa',
        loadComponent: () =>
          import('../pages/status-task/status-task-list/status-task-list.component').then(
            c => c.StatusTaskListComponent
          )
      },
      {
        path: 'create-status-tasks',
        title: 'Cadastrar Status de tarefa',
        loadComponent: () =>
          import('../pages/status-task/status-task-create/status-task-create.component').then(
            c => c.StatusTaskCreateComponent
          )
      },
      {
        path: 'create-status-tasks/:id/edit',
        title: 'Editando Status de Vendas',
        loadComponent: () =>
          import('../pages/status-task/status-task-create/status-task-create.component').then(
            c => c.StatusTaskCreateComponent
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
        title: 'Cadastrar jornada',
        loadComponent: () =>
          import('../pages/journey/journey-create/journey-create.component').then(c => c.JourneyCreateComponent)
      },
      {
        path: 'journey-create/:id/edit',
        title: 'Editando jornada',
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
        title: 'Cadastrar metódo de pagamento',
        loadComponent: () =>
          import('../pages/payment-method/payment-method-create/payment-method-create.component').then(
            c => c.PaymentMethodCreateComponent
          )
      },
      {
        path: 'payment-method-create/:id/edit',
        title: 'Metódo de pagamento',
        loadComponent: () =>
          import('../pages/payment-method/payment-method-create/payment-method-create.component').then(
            c => c.PaymentMethodCreateComponent
          )
      },
      {
        path: 'activity',
        title: 'Atividades',
        loadComponent: () =>
          import('../pages/activity/activity-list/activity-list.component').then(c => c.ActivityListComponent)
      },
      {
        path: 'create-activity',
        title: 'Cadastrar Atividades',
        loadComponent: () =>
          import('../pages/activity/activity-create/activity-create.component').then(c => c.ActivityCreateComponent)
      },
      {
        path: 'create-activity/:id/edit',
        title: 'Editando Atividades',
        loadComponent: () =>
          import('../pages/activity/activity-create/activity-create.component').then(c => c.ActivityCreateComponent)
      },
      {
        path: 'cost-center',
        title: 'Centro de custos',
        loadComponent: () =>
          import('../pages/cost-center/cost-center-list/cost-center-list.component').then(
            c => c.CostCenterListComponent
          )
      },
      {
        path: 'create-cost-center',
        title: 'Cadastrar centro de custos',
        loadComponent: () =>
          import('../pages/cost-center/cost-center-create/cost-center-create.component').then(
            c => c.CostCenterCreateComponent
          )
      },
      {
        path: 'cost-center/:id/edit',
        title: 'Editando centro de custos',
        loadComponent: () =>
          import('../pages/cost-center/cost-center-create/cost-center-create.component').then(
            c => c.CostCenterCreateComponent
          )
      },
      {
        path: 'project-type',
        title: 'Tipo de projeto',
        loadComponent: () =>
          import('../pages/project-type/project-type-list/project-type-list.component').then(
            c => c.ProjectTypeListComponent
          )
      },
      {
        path: 'create-project-type',
        title: 'Cadastrar tipo de projeto',
        loadComponent: () =>
          import('../pages/project-type/project-type-create/project-type-create.component').then(
            c => c.ProjectTypeCreateComponent
          )
      },
      {
        path: 'create-project-type/:id/edit',
        title: 'Tipo de projeto',
        loadComponent: () =>
          import('../pages/project-type/project-type-create/project-type-create.component').then(
            c => c.ProjectTypeCreateComponent
          )
      },
      {
        path: 'charge-type',
        title: 'Tipo de cobrança',
        loadComponent: () =>
          import('../pages/charge-type/charge-type-list/charge-type-list.component').then(
            c => c.ChargeTypeListComponent
          )
      },
      {
        path: 'create-charge-type',
        title: 'Cadastrar tipo de cobrança',
        loadComponent: () =>
          import('../pages/charge-type/charge-type-create/charge-type-create.component').then(
            c => c.ChargeTypeCreateComponent
          )
      },
      {
        path: 'create-charge-type/:id/edit',
        title: 'Tipo de cobrança',
        loadComponent: () =>
          import('../pages/charge-type/charge-type-create/charge-type-create.component').then(
            c => c.ChargeTypeCreateComponent
          )
      },
      {
        path: 'user-types',
        title: 'Tipos de usuário',
        loadComponent: () =>
          import('../pages/user-types/user-types-list/user-types-list.component').then(c => c.UserTypesListComponent)
      },
      {
        path: 'create-user-types',
        title: 'Cadastrar tipos de usuário',
        loadComponent: () =>
          import('../pages/user-types/user-types-create/user-types-create.component').then(
            c => c.UserTypesCreateComponent
          )
      },
      {
        path: 'create-user-types/:id/edit',
        title: 'Tipos de usuário',
        loadComponent: () =>
          import('../pages/user-types/user-types-create/user-types-create.component').then(
            c => c.UserTypesCreateComponent
          )
      },
      {
        path: 'checklists',
        title: 'Verificar Lista',
        loadComponent: () =>
          import('../pages/checklist/checklist-list/checklist-list.component').then(c => c.CheckListComponent)
      },
      {
        path: 'checklist-create',
        title: 'Verificar Lista',
        loadComponent: () =>
          import('../pages/checklist/checklist-create/checklist-create.component').then(c => c.ChecklistCreateComponent)
      },
      {
        path: 'checklist-create/:id/edit',
        title: 'Tipos de Usuário',
        loadComponent: () =>
          import('../pages/checklist/checklist-create/checklist-create.component').then(c => c.ChecklistCreateComponent)
      },
      {
        path: 'tags',
        title: 'Etiqueta',
        loadComponent: () => import('../pages/tag/tag-list/tag-list.component').then(c => c.TagListComponent)
      },
      {
        path: 'create-tags',
        title: 'Etiqueta',
        loadComponent: () => import('../pages/tag/tag-create/tag-create.component').then(c => c.TagCreateComponent)
      },
      {
        path: 'create-tags/:id/edit',
        title: 'Etiqueta',
        loadComponent: () => import('../pages/tag/tag-create/tag-create.component').then(c => c.TagCreateComponent)
      },
      {
        path: 'collaborator',
        title: 'Colaborador',
        loadComponent: () =>
          import('../pages/collaborator/collaborator-list/collaborator-list.component').then(
            c => c.CollaboratorListComponent
          )
      },
      {
        path: 'create-collaborator',
        title: 'Cadastrar colaborador',
        loadComponent: () =>
          import('../pages/collaborator/collaborator-create/collaborator-create.component').then(
            c => c.CollaboratorCreateComponent
          )
      },
      {
        path: 'create-collaborator/:id/edit',
        title: 'Colaborador',
        loadComponent: () =>
          import('../pages/collaborator/collaborator-create/collaborator-create.component').then(
            c => c.CollaboratorCreateComponent
          )
      },
      {
        path: 'status-task',
        title: 'Status de tarefas',
        loadComponent: () =>
          import('../pages/status-task/status-task-list/status-task-list.component').then(
            c => c.StatusTaskListComponent
          )
      },
      {
        path: 'create-status-task',
        title: 'Cadastrar status de tarefas',
        loadComponent: () =>
          import('../pages/status-task/status-task-create/status-task-create.component').then(
            c => c.StatusTaskCreateComponent
          )
      },
      {
        path: 'create-status-task/:id/edit',
        title: 'Status de tarefas',
        loadComponent: () =>
          import('../pages/status-task/status-task-create/status-task-create.component').then(
            c => c.StatusTaskCreateComponent
          )
      },
      {
        path: 'client',
        title: 'Clientes',
        loadComponent: () =>
          import('../pages/client/client-list/client-list.component').then(c => c.ClientListComponent)
      },
      {
        path: 'create-client',
        title: 'Cadastrar clientes',
        loadComponent: () =>
          import('../pages/client/client-create/client-create.component').then(c => c.ClientCreateComponent)
      },
      {
        path: 'create-client/:id/edit',
        title: 'Clientes',
        loadComponent: () =>
          import('../pages/client/client-create/client-create.component').then(c => c.ClientCreateComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthenticatedRoutingModule {}
