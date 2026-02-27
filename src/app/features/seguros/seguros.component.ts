import { Component, OnInit } from '@angular/core';
import { SeguroService } from './services/seguro.service';
import { Seguro } from './models/seguro';
import { SeguroClienteResponse } from './models/seguro-cliente-response';

@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.component.html',
  styleUrls: ['./seguros.component.sass']
})
export class SegurosComponent implements OnInit {
  ngOnInit(): void {

  }
  constructor(private serviceSeguro: SeguroService) {
    this.GetAllSeguros();
  }
  datoBuscar: any;

  seguroSeleccionado: SeguroClienteResponse = {
    seguro: {
      idSeguro: 0,
      codigo: '',
      nombre: '',
      suma: 0,
      prima: 0,
      idCliente: 0
    },
    cliente: {
      idCliente: 0,
      cedula: '',
      nombre: '',
      telefono: '',
      edad: 0
    }
  };

  seguroclienteResponse: SeguroClienteResponse[] = [];
  seguroclienteResponseBuscado: SeguroClienteResponse[] = [];

  GetAllSeguros() {
    this.serviceSeguro.segurosResponse$.subscribe({
      next: (segurosSubject) => {
        this.seguroclienteResponse = segurosSubject;
        this.seguroclienteResponseBuscado = segurosSubject;
      },
      error: (error) => {
        console.error('Error en el componente (SegurosComponent) :' + error);
      },
    });
  }
  /*
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
    }*/

  GetBuscar(): void {
    if (this.datoBuscar !== "" && this.seguroclienteResponse.length > 0) {
      this.seguroclienteResponse = this.seguroclienteResponseBuscado.filter(x => x.seguro.codigo.toLowerCase().startsWith(this.datoBuscar.toLowerCase()) || x.cliente.cedula.startsWith(this.datoBuscar));
    } else {
      this.seguroclienteResponse = [...this.seguroclienteResponseBuscado];
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
*/
  ObtenerCliente(seguroclienteResquest: SeguroClienteResponse) {
    this.seguroSeleccionado = seguroclienteResquest;
    this.serviceSeguro.EnviarDatosSeguro(this.seguroSeleccionado);
    console.log('EL ID seguro ES -->' + this.seguroSeleccionado.seguro.idSeguro)
    console.log('EL ID ckiente ES -->' + this.seguroSeleccionado.seguro.idCliente)
    // console.log('he seleccionado: ' + this.clieteSeleccionado.cedula + "  " + this.clieteSeleccionado.nombre);
  }
}
