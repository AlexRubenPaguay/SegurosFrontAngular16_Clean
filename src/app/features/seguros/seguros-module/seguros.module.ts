import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SegurosComponent } from '../seguros.component';
import { ActualizarComponent } from '../components/actualizar/actualizar.component';


@NgModule({
  declarations: [
    SegurosComponent,
    ActualizarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SegurosModule { }
