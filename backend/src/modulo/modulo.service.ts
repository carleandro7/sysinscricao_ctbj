import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from 'src/curso/dto/create-curso.dto';
import { UpdateCursoDto } from 'src/curso/dto/update-curso.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@Injectable()
export class ModuloService {
  constructor(private prisma: PrismaService) {}

  create(createModuloDto: CreateModuloDto) {
    return this.prisma.modulo.create({data: createModuloDto})
  }

  findAll() {
    return this.prisma.curso.findMany();
  }

  findOne(id: number) {
    return this.prisma.modulo.findUnique({where: {id}})
  }

  update(id: number, updateModuloDto: UpdateModuloDto) {
    return this.prisma.modulo.update({
      where: {id},
      data: updateModuloDto
    });
  }

  remove(id: number) {
    return this.prisma.modulo.delete({where: {id}});
  }
}
