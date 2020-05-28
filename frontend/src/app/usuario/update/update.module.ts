import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRoutingModule } from './update-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuModule } from '../menu/menu.module';


@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UpdateRoutingModule,
    MenuModule
  ]
})
export class UpdateModule { }
