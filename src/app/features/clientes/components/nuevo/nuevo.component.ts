import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.sass']
})
export class NuevoComponent implements OnInit {
  ngOnInit(): void {

  }
  constructor(private serviceCliente: ClienteService) {

  }
  titulo = 'Nuevo Cliente';
  modal: boolean = false;
  listaClientes = this.serviceCliente.listaClientes$;

  cliente = new FormGroup({
    idCliente: new FormControl(0),
    cedula: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.minLength(10)]),
    edad: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(160)])
  });

  openModal() {
    this.modal = true;
  }
  closeModal() {
    this.modal = false;
  }

  SubmitForm() {
    if (this.cliente.invalid) {
      this.cliente.markAllAsTouched();
      return;
    }
    const _cliente: Cliente = {
      idCliente: 0,
      cedula: this.cliente.value.cedula || '',
      nombre: this.cliente.value.nombre || '',
      telefono: this.cliente.value.telefono || '',
      edad: this.cliente.value.edad || 0
    };
    this.AgregarCliente(_cliente);
    this.closeModal();
  }

  AgregarCliente(cliente: Cliente) {
    this.serviceCliente.AgregarCliente(cliente);
  }

  reset() {
    this.cliente.reset();
  }

}
