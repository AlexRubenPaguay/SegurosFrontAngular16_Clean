import { Component } from '@angular/core';
import { ClienteService } from '../../../features/clientes/services/cliente.service';
import { SeguroService } from 'src/app/features/seguros/services/seguro.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {
  constructor(private serviceCliente: ClienteService, private serviceSeguro: SeguroService) {

  }
  totalClientes = this.serviceCliente.listaClientes$;
  totalAsegurados = this.serviceSeguro.listaSeguros$;

}
