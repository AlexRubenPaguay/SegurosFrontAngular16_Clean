import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { Cliente } from './models/cliente';
import { BehaviorSubject, Observable } from 'rxjs'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.sass']
})
export class ClientesComponent implements OnInit {

  constructor(private _serviceCliente: ClienteService) {
    this.GetAllClientes();
  }
  ngOnInit(): void {
  }

  datoBuscar: any;
  clientes: Cliente[] = [];
  clientesBuscados: Cliente[] = [];
  clieteSeleccionado: Cliente = {
    idCliente: 0,
    cedula: '',
    nombre: '',
    telefono: '',
    edad: 0
  };
  
  GetAllClientes() {
    this._serviceCliente.listaClientes$.subscribe({
      next: (clientesSubject) => {
        this.clientes = clientesSubject;
        this.clientesBuscados = clientesSubject;
      },
      error: (error) => {
        console.error('Error en el componente (ClientesComponent) :' + error);
      },
    });
  }

  GetBuscar(): void {
    if (this.datoBuscar !== "" && this.clientes.length > 0) {
      this.clientes = this.clientesBuscados.filter(x => x.cedula.toLowerCase().startsWith(this.datoBuscar) || x.nombre.toLowerCase().includes(this.datoBuscar.toLowerCase()) || x.telefono.startsWith(this.datoBuscar));
    } else {
      this.clientes = [...this.clientesBuscados];
      // this.GetAllClientes();
    }
  }
  /*
    GetAllClientes() {
      this._serviceCliente.GetAllClientes().subscribe({
        next: (data) => {
          console.log(data);
          this.clientes = data;
          this.clientesBuscados=data;
        },
        error: () => {
          console.error('Error al listar los clientes.');
        }
      });
    }
  */
  EliminarCliente(cedula: string) {
    this._serviceCliente.EliminarCliente(cedula);
  }

  Confirmar(cedula: string) {
    const varificar = window.confirm(`Está seguro que desea eliminar el cliente con cédula [${cedula}]`);
    if (varificar) {
      this.EliminarCliente(cedula);
    }
  }

  ObtenerCliente(cliente: Cliente) {
    this.clieteSeleccionado = cliente;
    this._serviceCliente.EnviarDatosCliente(cliente);
    console.log('EL ID ES -->' + cliente.idCliente)
    console.log('he seleccionado: ' + this.clieteSeleccionado.cedula + "  " + this.clieteSeleccionado.nombre);
  }

}
