import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SegurosComponent } from '../seguros.component';
import { ActualizarComponent } from '../components/actualizar/actualizar.component';
import { DetallesComponent } from '../components/detalles/detalles.component';
import { NuevoComponent } from '../components/nuevo/nuevo.component';


@NgModule({
  declarations: [
    SegurosComponent,
    ActualizarComponent,
    DetallesComponent,
    NuevoComponent
  ],
  exports: [
    NuevoComponent // ← Exportar el componente para usarlo en otros módulos
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SegurosModule { }
