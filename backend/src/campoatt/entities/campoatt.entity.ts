import { CreateListselectDto } from "src/listselect/dto/create-listselect.dto";
import { Listselect } from "src/listselect/entities/listselect.entity";

export class Campoatt {
    titulo: string;
    preenchimento_inicial: string;
    tipocampo: number;
    obrigatorio: number;
    modeloId?: number;
    listselects?: Listselect[];
}
