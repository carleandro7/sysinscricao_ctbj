import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@Controller('modulos')
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) {}

  @Post()
  create(@Body() createModuloDto: CreateModuloDto) {
    return this.moduloService.create(createModuloDto);
  }

  @Get()
  findAll() {
    return this.moduloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuloDto: UpdateModuloDto) {
    return this.moduloService.update(+id, updateModuloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduloService.remove(+id);
  }
}
