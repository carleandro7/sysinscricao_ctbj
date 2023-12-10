import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListselectService } from './listselect.service';
import { CreateListselectDto } from './dto/create-listselect.dto';
import { UpdateListselectDto } from './dto/update-listselect.dto';

@Controller('listselect')
export class ListselectController {
  constructor(private readonly listselectService: ListselectService) {}

  @Post()
  create(@Body() createListselectDto: CreateListselectDto) {
    return this.listselectService.create(createListselectDto);
  }

  @Get()
  findAll() {
    return this.listselectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listselectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListselectDto: UpdateListselectDto) {
    return this.listselectService.update(+id, updateListselectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listselectService.remove(+id);
  }
}
