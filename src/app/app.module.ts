import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClientesComponent } from './features/clientes/clientes.component';
import { SegurosComponent } from './features/seguros/seguros.component';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { NuevoComponent } from './features/clientes/components/nuevo/nuevo.component';
import { ActualizarComponent } from './features/clientes/components/actualizar/actualizar.component';
import { DetallesComponent } from './features/clientes/components/detalles/detalles.component';
import { EliminarComponent } from './features/clientes/components/eliminar/eliminar.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    SegurosComponent,
    UsuariosComponent,
    MenuComponent,
    NuevoComponent,
    ActualizarComponent,
    DetallesComponent,
    EliminarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
