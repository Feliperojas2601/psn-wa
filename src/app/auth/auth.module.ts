import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyTokenComponent } from './components/verify-token/verify-token.component';
import { ResetPasswordConfirmedComponent } from './components/reset-password-confirmed/reset-password-confirmed.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    VerifyTokenComponent,
    ResetPasswordConfirmedComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    ReactiveFormsModule
  ]
})
export class AuthModule { }
