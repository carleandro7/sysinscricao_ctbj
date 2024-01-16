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

  async findAll(page: number = 0, pageSize: number = 0, nomePesquisa: string= '') {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    
    if(page == 0){
      const [data, totalItems] = await Promise.all([
        this.prisma.user.findMany({
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
            status: true,
            instituicaoId: true,
          },
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
        this.prisma.user.count(),
      ])
      return [data, totalItems]
    }else{
      const [data, totalItems] = await Promise.all([
        this.prisma.user.findMany({
          skip,
          take,
          include: {instituicao: true},
          orderBy:{
            nome: 'asc'
          }
        }),
        this.prisma.user.count(),
      ])
      return [data, totalItems]
    }
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    if(updateUserDto.senha != "" && updateUserDto.senha != null){
      const createdUser = this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          senha: await bcrypt.hash(updateUserDto.senha, 10),
        }
      });
      return {
        ...createdUser,
        senha: undefined,
      };
    }else{
      const {senha, ...dados} = updateUserDto;
      const createdUser = this.prisma.user.update({
        where: { id },
        data: dados
      });
      return {
        ...createdUser,
        senha: undefined,
      };
    }

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
