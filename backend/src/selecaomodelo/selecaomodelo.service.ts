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

  async findAll(page: number = 0, pageSize: number = 0, nomePesquisa: string= '') {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    if(page == 0){
      const [data, totalItems] = await Promise.all([
        this.prisma.selecaomodelo.findMany({
 
          where:{
            descricao: {
              contains: nomePesquisa,
              mode: 'insensitive', // Torna a comparação insensível a maiúsculas e minúsculas
            },
          },
          orderBy:{
            id: 'desc'
          }
        }),
        this.prisma.selecaomodelo.count(),
      ])
      return [data, totalItems]
    }else{
      const [data, totalItems] = await Promise.all([
        this.prisma.selecaomodelo.findMany({
          skip,
          take,
          include: {instituicao: true},
          orderBy:{
            id: 'desc'
          }
        }),
        this.prisma.selecaomodelo.count(),
      ])
      return [data, totalItems]
    }
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
