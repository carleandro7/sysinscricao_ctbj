import { Injectable } from '@nestjs/common';
import { CreateSelecaomodeloDto } from './dto/create-selecaomodelo.dto';
import { UpdateSelecaomodeloDto } from './dto/update-selecaomodelo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SelecaomodeloService {
  constructor(private prisma: PrismaService) { }
  create(createCreateSelecaomodeloDto: CreateSelecaomodeloDto) {
    return this.prisma.selecaomodelo.create({
      data: {
        ...createCreateSelecaomodeloDto,
        modelos: {
          create: createCreateSelecaomodeloDto.modelos? 
          createCreateSelecaomodeloDto.modelos.map((modelo => ({
            ...modelo,
            campoatts: {
              create: modelo.campoatts
              ? modelo.campoatts.map((campoatt) => ({
                ...campoatt,
                listselects: { create: campoatt.listselects }
              }))
              : undefined,
            }
          }))) : undefined,
        }
      }, include: { modelos: {include: {campoatts: {include: {listselects:true}}}} }
    })
  }

  findAll() {
    return this.prisma.selecaomodelo.findMany();
  }

  findOne(id: number) {
    return this.prisma.selecaomodelo.findUnique({ where: { id } })
  }

  update(id: number, updateSelecaomodeloDto: UpdateSelecaomodeloDto) {
    return this.prisma.selecaomodelo.updateMany({
      where: { id },
      data: updateSelecaomodeloDto
    });
  }

  remove(id: number) {
    return this.prisma.selecaomodelo.delete({ where: { id } });
  }
}
