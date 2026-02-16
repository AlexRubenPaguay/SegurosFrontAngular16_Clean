import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { Cliente } from './models/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.sass']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  constructor(private _serviceCliente: ClienteService) {
  }
  ngOnInit(): void {
    this.GetAllClientes();
  }

  GetAllClientes() {
    this._serviceCliente.GetAllClientes().subscribe(
      (data) => {
        console.log(data);
        this.clientes = data;
      }
    );
  }

}
