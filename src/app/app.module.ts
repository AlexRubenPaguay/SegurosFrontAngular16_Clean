import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { MenuComponent } from './core/components/menu/menu.component';
//MODULOS DE CLIENTE
import { ClientesModule } from './features/clientes/clientes-module/clientes.module';
//MODULOS DE SEGUROS
import { SegurosModule } from './features/seguros/seguros-module/seguros.module';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ClientesModule,
    SegurosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
