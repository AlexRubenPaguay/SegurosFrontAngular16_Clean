import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente'

@Injectable({
  providedIn: 'root'
})
export class ClienteService implements OnInit {
  constructor(private _client: HttpClient) { }

  ngOnInit(): void {
  }

  url: string = 'http://localhost:5261/api/v1/Cliente/';

  GetAllClientes() {
    return this._client.get<Cliente[]>(this.url);
  }
  GetClienteByCedula(cedula: string) {
    return this._client.get<Cliente>(this.url + 'GetByCedula/' + `${cedula}`);
  }
  GetClienteById(idCliente: number) {
    return this._client.get<Cliente>(this.url + `${idCliente}`);
  }

  AgregarCliente(cliente: Cliente) {
    return this._client.post(this.url, cliente);
  }

  ActualizarCliente(idCliente: number, cliente: Cliente) {
    return this._client.put(this.url + `${idCliente}`, cliente);
  }

  EliminarCliente(cedula: string) {
    return this._client.delete(this.url + `${cedula}`);
  }
}
