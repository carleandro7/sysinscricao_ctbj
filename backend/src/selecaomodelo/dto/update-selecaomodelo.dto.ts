import { PartialType } from '@nestjs/mapped-types';
import { CreateSelecaomodeloDto } from './create-selecaomodelo.dto';

export class UpdateSelecaomodeloDto extends PartialType(CreateSelecaomodeloDto) {}
