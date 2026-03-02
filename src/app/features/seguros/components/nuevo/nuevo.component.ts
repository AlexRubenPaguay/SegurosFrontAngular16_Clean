import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SeguroService } from '../../services/seguro.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Seguro } from '../../models/seguro';
import { ClienteService } from 'src/app/features/clientes/services/cliente.service';
import { Cliente } from 'src/app/features/clientes/models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-seguro',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.sass']
})
export class NuevoComponent implements OnInit, OnDestroy {

  constructor(private modalService: NgbModal, private router: Router, private servicioCliente: ClienteService, private servicioSeguro: SeguroService, private fb: FormBuilder) {
    this.ObtenerDetallesCliente();
  }

  ngOnInit(): void {
  }

  private destruir$ = new Subject<void>();

  titulo: string = 'Asignar Seguro';
  //Cliente
  cliente: Cliente = {
    idCliente: 0,
    cedula: '',
    nombre: '',
    telefono: '',
    edad: 0
  };

  // VERSIÓN CON FORMBUILDER (más limpia y recomendada)
  seguro = new FormGroup({
    idSeguro: new FormControl(0),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    codigo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    suma: new FormControl(0, [Validators.required, Validators.min(1)]),
    prima: new FormControl(0, [Validators.required, Validators.min(1)]),
    idCliente: new FormControl(0, Validators.required)
  });


  reset() {
    this.seguro.reset();
  }

  open(content: any) {
    this.ObtenerDetallesCliente();
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'lg'
    });

  }

  SubmitForm() {
    if (this.seguro.invalid) {
      this.seguro.markAllAsTouched();
      return;
    }
    const seguroData = this.seguro.value;

    const _seguro: Seguro = {
      idSeguro: seguroData?.idSeguro || 0,
      nombre: seguroData?.nombre || '',
      codigo: seguroData?.codigo || '',
      suma: seguroData?.suma || 0.0,
      prima: seguroData?.prima || 0.0,
      idCliente: this.cliente.idCliente || 0
    }
    this.servicioSeguro.AgregarSeguro(_seguro);
    this.modalService.dismissAll();
    this.router.navigateByUrl('/seguros');
  }


  ObtenerDetallesCliente() {
    this.servicioCliente.detallesCliente$.pipe(takeUntil(this.destruir$)).subscribe({
      next: (_cliente) => {
        if (_cliente) {
          this.cliente = _cliente;
        }
      },
      error: (error) => {
        console.log('Error al obtener los detalles del Cliente (ObtenerDetallesCliente)' + error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destruir$.next();
    this.destruir$.complete();
  }

}
