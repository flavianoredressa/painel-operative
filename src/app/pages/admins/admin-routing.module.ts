import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin-create/admin-create.component';
import { AdminListComponent } from './admin-list/admin-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListComponent,
    title: 'Admin | $NOME_SEU_SITE_TITLE'
  },
  {
    path: 'create',
    component: AdminComponent,
    title: 'Cadastrar Admin | $NOME_SEU_SITE_TITLE'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
