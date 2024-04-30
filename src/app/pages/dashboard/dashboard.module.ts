import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard | $NOME_SEU_SITE_TITLE'
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, NgbTooltip, RouterModule.forChild(routes)]
})
export class DashboardModule {}
