import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AuthenticationComponent } from "./components/authentication/authentication.component";
import { PrincipalComponent } from "./components/principal/principal.component";
import { IndexComponent } from "./components/index/index.component";
import { AuthGuardService } from './infra/service/auth-guard.service';

const routes: Routes = [
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index', component: IndexComponent },
  {path:'authentication', component: AuthenticationComponent },
  {path:'principal', component: PrincipalComponent/* , canActivate: [AuthGuardService] */},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
