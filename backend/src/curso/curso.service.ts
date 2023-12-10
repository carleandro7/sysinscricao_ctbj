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

  findAll() {
    return this.prisma.curso.findMany();
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
