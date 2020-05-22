import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    SigninModule,
    SignupModule,
    FontAwesomeModule,
    SweetAlert2Module
  ]
})
export class AutenticacaoModule { }
