import { PartialType } from '@nestjs/mapped-types';
import { CreateInstituicaoDto } from './create-instituicao.dto';

export class UpdateInstituicaoDto extends PartialType(CreateInstituicaoDto) {}
