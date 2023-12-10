import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.prisma.user.create({ data: {
      ...createUserDto,
      senha: await bcrypt.hash(createUserDto.senha, 10),
    } });

    return {
      ...createdUser,
      senha: undefined,
    };
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        status: true,
        instituicaoId: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        status: true,
        instituicaoId: true
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const createdUser = this.prisma.user.update({
      where: { id },
      data: updateUserDto
    });
    return {
      ...updateUserDto,
      senha: undefined,
    };
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        status: true,
        instituicaoId: true
      }
    });
  }
}
