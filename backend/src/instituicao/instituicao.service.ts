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


  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const [data, totalItems] = await Promise.all([
      this.prisma.instituicao.findMany({
        skip,
        take,
        include: {cursos: true, users: true, modulos: true, selecaomodelos: true},
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
