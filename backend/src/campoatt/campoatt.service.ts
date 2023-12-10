import { Injectable } from '@nestjs/common';
import { CreateCampoattDto } from './dto/create-campoatt.dto';
import { UpdateCampoattDto } from './dto/update-campoatt.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CampoattService {
  constructor(private prisma: PrismaService) {}
  create(createCampoattDto: CreateCampoattDto) {
    return this.prisma.campoatt.create({data: {
      ...createCampoattDto,
      listselects: {create: createCampoattDto.listselects}
    }, include: {listselects: true}});
  }

  findAll() {
    return `This action returns all campoatt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campoatt`;
  }

  update(id: number, updateCampoattDto: UpdateCampoattDto) {
    return `This action updates a #${id} campoatt`;
  }

  remove(id: number) {
    return `This action removes a #${id} campoatt`;
  }
}
