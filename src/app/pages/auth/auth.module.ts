import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IsLoadingDirective } from '@burand/angular';
import { errorTailorImports } from '@ngneat/error-tailor';

import { InputPasswordComponent } from '@forms/input-password/input-password.component';
import { InputComponent } from '@forms/input/input.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    InputPasswordComponent,
    IsLoadingDirective,
    errorTailorImports,
    AuthRoutingModule
  ]
})
export class AuthModule {}
