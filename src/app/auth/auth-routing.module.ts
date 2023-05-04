import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyTokenComponent } from './components/verify-token/verify-token.component';
import { ResetPasswordConfirmedComponent } from './components/reset-password-confirmed/reset-password-confirmed.component';

const routes: Routes = [

    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'reset-password-confirmed/:code/:id', component: ResetPasswordConfirmedComponent },
    { path: 'verify-token/:token/:id', component: VerifyTokenComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}