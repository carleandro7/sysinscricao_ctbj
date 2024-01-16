import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe  } from '@nestjs/common';
import { SelecaomodeloService } from './selecaomodelo.service';
import { CreateSelecaomodeloDto } from './dto/create-selecaomodelo.dto';
import { UpdateSelecaomodeloDto } from './dto/update-selecaomodelo.dto';

@Controller('selecaomodelos')
export class SelecaomodeloController {
  constructor(private readonly selecaomodeloService: SelecaomodeloService) {}

  @Post()
  create(@Body() createSelecaomodeloDto: CreateSelecaomodeloDto) {
    return this.selecaomodeloService.create(createSelecaomodeloDto);
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
    @Query('nome') nomePesquisa: string = '',
  ) {
    return this.selecaomodeloService.findAll(page, pageSize, nomePesquisa);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selecaomodeloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSelecaomodeloDto: UpdateSelecaomodeloDto) {
    return this.selecaomodeloService.update(+id, updateSelecaomodeloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.selecaomodeloService.remove(+id);
  }
}
