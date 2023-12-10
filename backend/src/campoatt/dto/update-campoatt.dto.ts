import { PartialType } from '@nestjs/mapped-types';
import { CreateCampoattDto } from './create-campoatt.dto';

export class UpdateCampoattDto extends PartialType(CreateCampoattDto) {}
