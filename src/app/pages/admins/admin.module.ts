import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IsLoadingDirective } from '@burand/angular';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { errorTailorImports } from '@ngneat/error-tailor';
import { LucideAngularModule } from 'lucide-angular';

import { InputComponent } from '@forms/input/input.component';
import { AdminComponent } from './admin-create/admin-create.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminListComponent, AdminComponent],
  imports: [
    errorTailorImports,
    IsLoadingDirective,
    NgbPaginationModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    InputComponent,
    LucideAngularModule
  ]
})
export class AdminModule {}
