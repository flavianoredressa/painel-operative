import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin-create/admin-create.component';
import { AdminListComponent } from './admin-list/admin-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListComponent,
    title: 'Admin | Painel Operative'
  },
  {
    path: 'create',
    component: AdminComponent,
    title: 'Cadastrar Admin | Painel Operative'
  },
  {
    path: '/:id/edit',
    title: 'Editar Admin | Painel Operative ',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
