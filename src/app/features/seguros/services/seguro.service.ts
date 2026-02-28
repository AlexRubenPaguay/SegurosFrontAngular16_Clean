import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Seguro } from '../models/seguro';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
import { ClienteService } from '../../clientes/services/cliente.service';
import { Cliente } from '../../clientes/models/cliente';
import { SeguroClienteResponse } from '../models/seguro-cliente-response';
import { SegurosComponent } from '../seguros.component';

@Injectable({
  providedIn: 'root'
})
export class SeguroService implements OnInit {

  constructor(private _client: HttpClient, private serviceClinte: ClienteService) {
    this.GetAllSeguros();
  }

  ngOnInit(): void {
  }

  url: string = 'http://localhost:5261/api/v1/Seguro/';

  //PARA VER CAMBIOS EN LISTA DE SEGUROS
  //private listaSegurosSubject = new BehaviorSubject<Seguro[]>([]);
  //listaSeguros$ = this.listaSegurosSubject.asObservable();


  //PARA VER CAMBIOS EN LISTA DE SEGUROS
  private segurosResponseSubject = new BehaviorSubject<SeguroClienteResponse[]>([]);
  segurosResponse$ = this.segurosResponseSubject.asObservable();

  //PARA VER LOS DETALLES DE UN SEGURO
  private detallesSeguroSubject = new BehaviorSubject<SeguroClienteResponse | null>(null);
  detallesSeguro$ = this.detallesSeguroSubject.asObservable();

  EnviarDatosSeguro(seguroclienteRequest: SeguroClienteResponse) {
    this.detallesSeguroSubject.next(seguroclienteRequest);
  }

  seguroclienteResponse: SeguroClienteResponse[] = [];

  GetAllSeguros() {
    this._client.get<Seguro[]>(this.url).subscribe({
      next: (seguros) => {
        //this.listaSegurosSubject.next(seguros);
        if (seguros !== null && seguros.length > 0) {
          // Crear un contador para saber cuándo terminan todas las peticiones
          let peticionesCompletadas = 0;

          // Limpiar el array antes de empezar (importante para evitar duplicados)
          this.seguroclienteResponse = [];
          seguros.forEach(_seguro => {  ////RRECORRE TODO EL LISTADO DE SEGUROS
            this.serviceClinte.GetClienteById(_seguro.idCliente).subscribe({  // POR CADA SEGURO VA Y BUSCA POR IDCLIENTE, LOS DATOS DEL CLIENTE ASOCIADO AL SEGURO
              next: (_cliente) => {
                let segurocliente = {    // FORMA EL OBJETO CON LOS DATOS DE SEGURO Y CLIENTE
                  seguro: _seguro,
                  cliente: _cliente
                };
                this.seguroclienteResponse.push(segurocliente);  // AÑADE EL OBJETO ANTERIOR AL LISTADO
                peticionesCompletadas++;
                if (peticionesCompletadas === seguros.length) {
                  // SOLO cuando TODAS las peticiones terminen, emitimos el resultado
                  this.segurosResponseSubject.next(this.seguroclienteResponse);
                  console.log('Lista actualizada:', this.seguroclienteResponse);
                }
              },
              error: (error) => {
                console.error('Error al obtener los datos del cliente x cada seguro (GetAllSeguros)' + error);
              },
            });
          });

        } else {
          this.seguroclienteResponse = [];
          this.segurosResponseSubject.next([]);
          console.log('No hay seguros servico (GetAllSeguros)' + seguros);
        }
      },
      error: (error) => {
        console.error('Error en el servicio (GetAllSeguros):' + error);
      }
    });
  }

  GetSeguroByCodigo(codigo: string): Observable<Seguro> {
    return this._client.get<Seguro>(this.url + `${codigo}`);
  }

  GetSeguroById(idSeguro: number): Observable<Seguro> {
    return this._client.get<Seguro>(this.url + `${idSeguro}`);
  }

  AgregarSeguro(seguro: Seguro) {
    try {
      this._client.post(this.url, seguro).subscribe({
        next: () => {
          this.GetAllSeguros();
        },
        error: (error) => {
          console.error('Error al conectar con la API(AgregarSeguro): ' + error);
        }
      });
    } catch (error) {
      console.error('Error desconocido en (AgregarSeguro) :' + error)
    }
  }

  ActualizarSeguro(idSeguro: number, seguro: Seguro) {
    try {
      this._client.put(this.url + `${idSeguro}`, seguro).subscribe({
        next: (value) => {
          this.GetAllSeguros();
        },
        error: (error) => {
          console.error('Error al conectar con la API(ActualizarSeguro): ' + error);
        },
      });
    } catch (error) {
      console.error('Error desconocido en (ActualizarSeguro) :' + error)
    }
  }

  EliminarSeguro(idSeguro: number) {
    this._client.delete(this.url + `${idSeguro}`).subscribe({
      next: async () => {
        await this.GetAllSeguros();
      },
      error: (error) => {
        console.error(`Error al eliminar el seguro [${idSeguro}]` + error.error);
      },
    });
  }
}
