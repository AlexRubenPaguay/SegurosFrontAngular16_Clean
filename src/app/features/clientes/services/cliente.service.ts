import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService implements OnInit {

  constructor(private _client: HttpClient) {
    this.GetAllClientes();
  }

  ngOnInit(): void {
  }

  url: string = 'http://localhost:5261/api/v1/Cliente/';
  //PARA VER CAMBIOS EN LISTA DE CLIENTES
  private listaClientesSubject = new BehaviorSubject<Cliente[]>([]);
  listaClientes$ = this.listaClientesSubject.asObservable();

  //PARA VER LOS DETALLES DE UN CLIENTE
  private detallesClienteSubject = new BehaviorSubject<Cliente| null>(null);
  detallesCliente$ = this.detallesClienteSubject.asObservable();

  EnviarDatosCliente(cliente: Cliente) {
    this.detallesClienteSubject.next(cliente);
  }

  GetAllClientes() {
    this._client.get<Cliente[]>(this.url).subscribe({
      next: (clientes) => {
        this.listaClientesSubject.next(clientes);
      },
      error: (error) => {
        console.error('Error en el servicio (GetAllClientes):' + error);
      }
    });
  }

  GetClienteByCedula(cedula: string): Observable<Cliente> {
    return this._client.get<Cliente>(this.url + 'GetByCedula/' + `${cedula}`);
  }
  GetClienteById(idCliente: number): Observable<Cliente> {
    return this._client.get<Cliente>(this.url + `${idCliente}`);
  }

  AgregarCliente(cliente: Cliente) {
    try {
      this._client.post(this.url, cliente).subscribe({
        next: () => {
          this.GetAllClientes();
        },
        error: (error) => {
          console.error('Error al conectar con la API(AgregarCliente): ' + error);
        }
      });
    } catch (error) {
      console.error('Error desconocido en (AgregarCliente) :' + error)
    }
  }

  ActualizarCliente(idCliente: number, cliente: Cliente) {
    try {
      this._client.put(this.url + `${idCliente}`, cliente).subscribe({
        next: (value) => {
          this.GetAllClientes();
        },
        error: (error) => {
          console.error('Error al conectar con la API(ActualizarCliente): ' + error);
        },
      });
    } catch (error) {
      console.error('Error desconocido en (ActualizarCliente) :' + error)
    }

  }

  EliminarCliente(cedula: string) {
    try {
      this._client.delete(this.url + `${cedula}`).subscribe({
        next: () => {
          this.GetAllClientes();
        },
        error: (error) => {
          this.GetAllClientes();
          console.error('Error al conectar con la API (EliminarCliente): ' + error.error);
        }
      });
    } catch (error) {
      console.error('Error desconocido en (EliminarCliente) :' + error)
    }
  }
}
