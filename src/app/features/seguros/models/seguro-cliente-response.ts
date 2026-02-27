import { Cliente } from "../../clientes/models/cliente";
import { Seguro } from "./seguro";

export interface SeguroClienteResponse {
    seguro:Seguro,
    cliente:Cliente
}
