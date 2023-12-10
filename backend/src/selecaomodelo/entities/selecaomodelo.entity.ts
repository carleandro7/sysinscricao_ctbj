import { CreateModeloDto } from "src/modelo/dto/create-modelo.dto";
import { Modelo } from "src/modelo/entities/modelo.entity";


export class Selecaomodelo {

    descricao: string;
    inicio_inscricao: Date;
    fim_inscricao: Date;
    inicio_resultado: Date;
    fim_resultado: Date;
    inicio_recurso: Date;
    fim_recurso: Date;
    resultado_final: Date;
    texto_documentacao: string;
    texto_final_pagina: string;
    instituicaoId: number;
    modelos?: Modelo[]
}
