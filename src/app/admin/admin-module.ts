import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { Perfil } from './perfil/perfil';
import { User } from './user/user';


@NgModule({
  declarations: [
    Perfil,
    User
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
