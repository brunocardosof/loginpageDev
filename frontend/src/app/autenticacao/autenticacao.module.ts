import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { SigninModule } from './signin/signin.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    SigninModule,
    FontAwesomeModule
  ]
})
export class AutenticacaoModule { }
