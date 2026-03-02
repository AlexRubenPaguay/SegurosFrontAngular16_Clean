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
    this.GetAllSeguros();
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

  GetBuscar(): void {
    if (this.datoBuscar !== "" && this.seguroclienteResponse.length > 0) {
      this.seguroclienteResponse = this.seguroclienteResponseBuscado.filter(x => x.seguro.codigo.toLowerCase().startsWith(this.datoBuscar.toLowerCase()) || x.cliente.cedula.startsWith(this.datoBuscar));
    } else {
      this.seguroclienteResponse = [...this.seguroclienteResponseBuscado];
      // this.GetAllClientes();
    }
  }

  EliminarSeguro(idSeguro: number) {
    this.serviceSeguro.EliminarSeguro(idSeguro);
  }

  Confirmar(seguroclienteResquest: SeguroClienteResponse) {
    const varificar = window.confirm(`Está seguro que desea eliminar el seguro con código [${seguroclienteResquest.seguro.codigo}] asociado al cliente [${seguroclienteResquest.cliente.nombre}]`);
    if (varificar) {
      this.EliminarSeguro(seguroclienteResquest.seguro.idSeguro);
    }
  }

  ObtenerCliente(seguroclienteResquest: SeguroClienteResponse) {
    this.seguroSeleccionado = seguroclienteResquest;
    this.serviceSeguro.EnviarDatosSeguro(this.seguroSeleccionado);
  }
}
