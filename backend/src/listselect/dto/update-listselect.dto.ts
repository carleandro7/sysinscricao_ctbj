import { PartialType } from '@nestjs/mapped-types';
import { CreateListselectDto } from './create-listselect.dto';

export class UpdateListselectDto extends PartialType(CreateListselectDto) {}
