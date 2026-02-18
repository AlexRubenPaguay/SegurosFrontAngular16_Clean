import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Subject, takeUntil } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.sass']
})
export class DetallesComponent implements OnInit {

  constructor(private modalService:NgbModal, private servicioCliente: ClienteService) {

  }
  ngOnInit(): void {
    this.ObtenerDetallesCliente();
  }

  private destruir$ = new Subject<void>();

  titulo: string = 'Detalles de Cliente';
  //modal: boolean = false;
  cliente: Cliente | null = {
    idCliente:0,
    cedula: '',
    nombre: '',
    telefono: '',
    edad: 0
  };

  reset() {
    this.cliente = {
      idCliente:0,
      cedula: '',
      nombre: '',
      telefono: '',
      edad: 0
    };
  }
  open(content: any) {
    this.ObtenerDetallesCliente();
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,      // Opcional: centra el modal
     // size: 'lg'
    }); // Abre el modal
  }


  ObtenerDetallesCliente() {
    this.servicioCliente.detallesCliente$.pipe(takeUntil(this.destruir$)).subscribe({
      next: (detalles) => {
        if (detalles) {
          this.cliente = detalles;          
        }
      },
      error: (error) => { 
        console.log('Error al obtener los detalles del cliente (ObtenerDetallesCliente)'+error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destruir$.next();
    this.destruir$.complete();
  }

}
