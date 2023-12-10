import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampoattService } from './campoatt.service';
import { CreateCampoattDto } from './dto/create-campoatt.dto';
import { UpdateCampoattDto } from './dto/update-campoatt.dto';

@Controller('campoatt')
export class CampoattController {
  constructor(private readonly campoattService: CampoattService) {}

  @Post()
  create(@Body() createCampoattDto: CreateCampoattDto) {
    return this.campoattService.create(createCampoattDto);
  }

  @Get()
  findAll() {
    return this.campoattService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campoattService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampoattDto: UpdateCampoattDto) {
    return this.campoattService.update(+id, updateCampoattDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campoattService.remove(+id);
  }
}
