import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ClientesComponent } from '../clientes.component';
import { NuevoComponent } from '../components/nuevo/nuevo.component';
import { ActualizarComponent } from '../components/actualizar/actualizar.component';
import { DetallesComponent } from '../components/detalles/detalles.component';
import { EliminarComponent } from '../components/eliminar/eliminar.component';
import { SegurosModule } from "../../seguros/seguros-module/seguros.module";

@NgModule({
  declarations: [
    ClientesComponent,
    NuevoComponent,
    ActualizarComponent,
    DetallesComponent,
    EliminarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SegurosModule
  ]
})
export class ClientesModule { }
