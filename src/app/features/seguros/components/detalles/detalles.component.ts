import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SeguroService } from '../../services/seguro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { SeguroClienteResponse } from '../../models/seguro-cliente-response';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.sass']
})
export class DetallesComponent implements OnInit, OnDestroy {
  constructor(private modalService: NgbModal, private servicioSeguro: SeguroService, private fb: FormBuilder) {
    this.ObtenerDetallesSeguro();
  }

  ngOnInit(): void {
  }

  private destruir$ = new Subject<void>();

  titulo: string = 'Detalles Seguro';
  /*
    seguroClienteResponse = new FormGroup({
      seguro: new FormGroup({
        idSeguro: new FormControl(0, Validators.required),
        nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        codigo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
        suma: new FormControl(0.0, [Validators.required, Validators.min(1)]),
        prima: new FormControl(0.0, [Validators.required, Validators.min(1)]),
        idCliente: new FormControl(0, Validators.required)
      }),
      cliente: new FormGroup({
        idCliente: new FormControl(0, Validators.required),
        cedula: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
        edad: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(160)])
      })
    });
  */


  // VERSIÓN CON FORMBUILDER (más limpia y recomendada)
  seguroClienteResponse: SeguroClienteResponse | null = {
    seguro: {
      idSeguro: 0,
      nombre: '',
      codigo: '',
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


  reset() {
    this.seguroClienteResponse = {
      seguro: {
        idSeguro: 0,
        nombre: '',
        codigo: '',
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
  }

  open(content: any) {
    this.ObtenerDetallesSeguro();
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
       size: 'lg'
    });

  }
  /*
    SubmitForm() {
      if (this.seguroClienteResponse.invalid) {
        this.seguroClienteResponse.markAllAsTouched();
        return;
      }
      const seguroData = this.seguroClienteResponse.value.seguro;
      const _seguro: Seguro = {
        idSeguro: seguroData?.idSeguro || 0,
        nombre: seguroData?.nombre || '',
        codigo: seguroData?.codigo || '',
        suma: seguroData?.suma || 0.0,
        prima: seguroData?.prima || 0.0,
        idCliente: seguroData?.idCliente || 0
      }
      this.servicioSeguro.ActualizarSeguro(_seguro.idSeguro, _seguro);
      this.modalService.dismissAll();
    }
  */

  ObtenerDetallesSeguro() {
    this.servicioSeguro.detallesSeguro$.pipe(takeUntil(this.destruir$)).subscribe({
      next: (detalles) => {
        if (detalles) {
          this.seguroClienteResponse = detalles;
          //this.seguroClienteResponse?.cliente=detalles.cliente;
          /*this.seguroClienteResponse?.patchValue({
            seguro: detalles.seguro,
            cliente: detalles.cliente
          });*/
        }
      },
      error: (error) => {
        console.log('Error al obtener los detalles del Seguro (ObtenerDetallesSeguro)' + error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destruir$.next();
    this.destruir$.complete();
  }
}
