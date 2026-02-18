import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../services/cliente.service';
import { Subject, takeUntil } from 'rxjs';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.sass']
})
export class ActualizarComponent implements OnInit {

  constructor(private modalService: NgbModal, private servicioCliente: ClienteService) {
  }

  ngOnInit(): void {
    this.ObtenerDetallesCliente();
  }

  private destruir$ = new Subject<void>();

  titulo: string = 'Detalles de Cliente';
  //modal: boolean = false;
  /*_cliente: Cliente | null = {
    idCliente: 0,
    cedula: '',
    nombre: '',
    telefono: '',
    edad: 0
  };*/

  cliente = new FormGroup({
    idCliente: new FormControl(0),
    cedula: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.minLength(10)]),
    edad: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(160)])
  });

  reset() {
    this.cliente.reset();
  }
  open(content: any) {
    this.ObtenerDetallesCliente();
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      // size: 'lg'
    });

  }

  SubmitForm() {
    if (this.cliente.invalid) {
      this.cliente.markAllAsTouched();
      return;
    }
    const _cliente: Cliente = {
      idCliente: this.cliente.value.idCliente || 0,
      cedula: this.cliente.value.cedula || '',
      nombre: this.cliente.value.nombre || '',
      telefono: this.cliente.value.telefono || '',
      edad: this.cliente.value.edad || 0
    };
    this.servicioCliente.ActualizarCliente(_cliente.idCliente, _cliente);
    this.modalService.dismissAll();
  }


  ObtenerDetallesCliente() {
    this.servicioCliente.detallesCliente$.pipe(takeUntil(this.destruir$)).subscribe({
      next: (detalles) => {
        if (detalles) {
          this.cliente.patchValue(detalles);
        }
      },
      error: (error) => {
        console.log('Error al obtener los detalles del cliente (ObtenerDetallesCliente)' + error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destruir$.next();
    this.destruir$.complete();
  }
}
