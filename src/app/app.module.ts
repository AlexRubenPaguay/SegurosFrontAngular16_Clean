import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './features/clientes/clientes.component';
import { SegurosComponent } from './features/seguros/seguros.component';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { NuevoComponent } from './features/clientes/components/nuevo/nuevo.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    SegurosComponent,
    UsuariosComponent,
    MenuComponent,
    NuevoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
