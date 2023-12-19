import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';


@Injectable()
export class ModuloService {
  constructor(private prisma: PrismaService) {}

  create(createModuloDto: CreateModuloDto) {
    return this.prisma.modulo.create({data: createModuloDto})
  }

  async findAll(page: number = 0, pageSize: number = 0, nomePesquisa: string= '') {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    if(page == 0){
      const [data, totalItems] = await Promise.all([
        this.prisma.modulo.findMany({
          include: {instituicao: true},
          where:{
            nome: {
              contains: nomePesquisa,
              mode: 'insensitive', // Torna a comparação insensível a maiúsculas e minúsculas
            },
          },
          orderBy:{
            nome: 'asc'
          }
        }),
        this.prisma.modulo.count(),
      ])
      return [data, totalItems]
    }else{
      const [data, totalItems] = await Promise.all([
        this.prisma.modulo.findMany({
          skip,
          take,
          include: {instituicao: true},
          orderBy:{
            nome: 'asc'
          }
        }),
        this.prisma.modulo.count(),
      ])
      return [data, totalItems]
    }
  }

  findOne(id: number) {
    return this.prisma.modulo.findUnique({where: {id}})
  }

  update(id: number, updatemoduloDto: UpdateModuloDto) {
    return this.prisma.modulo.update({
      where: {id},
      data: updatemoduloDto
    });
  }

  remove(id: number) {
    return this.prisma.modulo.delete({where: {id}});
  }
}
