import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UpdateModule } from './update/update.module';
import { ChangeEmailModule } from './change-email/change-email.module';
import { ChangePasswordModule } from './change-password/change-password.module';
import { MenuModule } from './menu/menu.module';
import { DeleteComponent } from './delete/delete.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DeleteModule } from './delete/delete.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SweetAlert2Module,
    UpdateModule,
    ChangeEmailModule,
    ChangePasswordModule, 
    DeleteModule   
  ]
})
export class UsuarioModule { }
