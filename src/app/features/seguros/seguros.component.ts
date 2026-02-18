import { Component, OnInit } from '@angular/core';
import { SeguroService } from './services/seguro.service';
import { Seguro } from './models/seguro';

@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.component.html',
  styleUrls: ['./seguros.component.sass']
})
export class SegurosComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private serviceSeguro: SeguroService) {
    this.GetAllSeguros();
  }
  datoBuscar: any;
  seguros: Seguro[] = [];
  segurosBuscados: Seguro[] = [];
  /*seguroSeleccionado: Seguro = {
    idCliente: 0,
    cedula: '',
    nombre: '',
    telefono: '',
    edad: 0
  };*/

  GetAllSeguros() {
    this.serviceSeguro.listaSeguros$.subscribe({
      next: (segurosSubject) => {
        this.seguros = segurosSubject;
        this.segurosBuscados = segurosSubject;
      },
      error: (error) => {
        console.error('Error en el componente (SegurosComponent) :' + error);
      },
    });
  }

  GetBuscar(): void {
    if (this.datoBuscar !== "" && this.seguros.length > 0) {
      this.seguros = this.segurosBuscados.filter(x => x.codigo.toLowerCase().startsWith(this.datoBuscar.toLowerCase()));
    } else {
      this.seguros = [...this.segurosBuscados];
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
  /*EliminarCliente(cedula: string) {
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
  }*/
}
