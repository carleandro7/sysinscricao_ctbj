import { Injectable } from '@nestjs/common';
import { CreateListselectDto } from './dto/create-listselect.dto';
import { UpdateListselectDto } from './dto/update-listselect.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListselectService {
  constructor(private prisma: PrismaService) { }
  create(createListselectDto: CreateListselectDto) {
    return this.prisma.listselect.create({data: createListselectDto});
  }

  findAll() {
    return `This action returns all listselect`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listselect`;
  }

  update(id: number, updateListselectDto: UpdateListselectDto) {
    return `This action updates a #${id} listselect`;
  }

  remove(id: number) {
    return `This action removes a #${id} listselect`;
  }
}
