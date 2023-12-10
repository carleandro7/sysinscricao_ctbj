import { Injectable } from '@nestjs/common';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ModeloService {
  constructor(private prisma: PrismaService) { }
  create(createModeloDto: CreateModeloDto) {
    return this.prisma.modelo.create({
      data: {
        ...createModeloDto,
        campoatts: {
          create: createModeloDto.campoatts.map((campoatt) => ({
            ...campoatt,
            listselects: { create: campoatt.listselects }
          }))
        }
      }, include: { campoatts: {include: {listselects: true}} }
    })
  }

  findAll() {
    return this.prisma.modelo.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} modelo`;
  }

  update(id: number, updateModeloDto: UpdateModeloDto) {
    return `This action updates a #${id} modelo`;
  }

  remove(id: number) {
    return `This action removes a #${id} modelo`;
  }
}
