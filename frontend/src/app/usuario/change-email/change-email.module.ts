import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeEmailRoutingModule } from './change-email-routing.module';
import { ChangeEmailComponent } from './change-email.component';
import { MenuModule } from '../menu/menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChangeEmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChangeEmailRoutingModule,
    MenuModule
  ]
})
export class ChangeEmailModule { }
