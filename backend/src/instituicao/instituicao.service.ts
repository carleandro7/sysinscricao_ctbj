import { Injectable } from '@nestjs/common';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InstituicaoService {
  constructor(private prisma: PrismaService) {}

  async create(createInstituicaoDto: CreateInstituicaoDto) {
    return this.prisma.instituicao.create({data: createInstituicaoDto})
  }


  async findAll(page: number, pageSize: number, nomePesquisa: string) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    if(page == 0){
      const [data, totalItems] = await Promise.all([
        this.prisma.instituicao.findMany({
          include: {cursos: true, users: true, modulos: true, selecaomodelos: true},
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
        this.prisma.instituicao.count(),
      ])
      return [data, totalItems]
    }else{
      const [data, totalItems] = await Promise.all([
        this.prisma.instituicao.findMany({
          skip,
          take,
          include: {cursos: true, users: true, modulos: true, selecaomodelos: true},
          orderBy:{
            nome: 'asc'
          }
        }),
        this.prisma.instituicao.count(),
      ])
      return [data, totalItems]
    }
  }

  async findAll_simples() {
      const [data, totalItems] = await Promise.all([
        this.prisma.instituicao.findMany({
          orderBy:{
            nome: 'asc'
          }
        }),
        this.prisma.instituicao.count(),
      ])
      return [data, totalItems]
    
  }

  findOne(id: number) {
    return this.prisma.instituicao.findUnique({where: {id}})
  }

  update(id: number, updateInstituicaoDto: UpdateInstituicaoDto) {
    return this.prisma.instituicao.update({
      where: {id},
      data: updateInstituicaoDto
    });
  }

  remove(id: number) {
    return this.prisma.instituicao.delete({where: {id}});
  }
}
