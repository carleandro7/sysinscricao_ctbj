import { CreateCampoattDto } from "src/campoatt/dto/create-campoatt.dto";
import { Campoatt } from "src/campoatt/entities/campoatt.entity";

export class Modelo {
    id?: number;
    nome: string;
    replica_form: number;
    ordem: number;
    selecaomodeloId?: number;
    campoatts?: Campoatt[];
}
