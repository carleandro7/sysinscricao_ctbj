import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';

@Controller('instituicoes')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  @Post()
  create(@Body() createInstituicaoDto: CreateInstituicaoDto) {
    return this.instituicaoService.create(createInstituicaoDto);
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
    @Query('nome') nomePesquisa: string = '',
  ) {
    return this.instituicaoService.findAll(page, pageSize, nomePesquisa);
  }

  @Get('all')
  findAllSimples() {
    return this.instituicaoService.findAll_simples();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instituicaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstituicaoDto: UpdateInstituicaoDto) {
    return this.instituicaoService.update(+id, updateInstituicaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instituicaoService.remove(+id);
  }
}
