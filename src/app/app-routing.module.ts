import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './features/clientes/clientes.component';
import { SegurosComponent } from './features/seguros/seguros.component';

const routes: Routes = [
  {path:'',component:ClientesComponent},
{path:'clientes',component:ClientesComponent},
{path:'seguros',component:SegurosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
