import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { SigninModule } from './signin/signin.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    SigninModule,
    FontAwesomeModule,
    SweetAlert2Module
  ]
})
export class AutenticacaoModule { }
