import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CursoService {
  constructor(private prisma: PrismaService) {}

  create(createCursoDto: CreateCursoDto) {
    return this.prisma.curso.create({data: createCursoDto})
  }

  async findAll(page: number = 0, pageSize: number = 0, nomePesquisa: string= '') {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    if(page == 0){
      const [data, totalItems] = await Promise.all([
        this.prisma.curso.findMany({
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
        this.prisma.curso.count(),
      ])
      return [data, totalItems]
    }else{
      const [data, totalItems] = await Promise.all([
        this.prisma.curso.findMany({
          skip,
          take,
          include: {instituicao: true},
          orderBy:{
            nome: 'asc'
          }
        }),
        this.prisma.curso.count(),
      ])
      return [data, totalItems]
    }
  }

  findOne(id: number) {
    return this.prisma.curso.findUnique({where: {id}})
  }

  update(id: number, updateCursoDto: UpdateCursoDto) {
    return this.prisma.curso.update({
      where: {id},
      data: updateCursoDto
    });
  }

  remove(id: number) {
    return this.prisma.curso.delete({where: {id}});
  }
}
