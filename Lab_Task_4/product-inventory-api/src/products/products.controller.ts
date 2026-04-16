import {
  Controller, Get, Post, Patch, Put, Delete,
  Param, Body, Query, ParseIntPipe
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Post()
  create(@Body() dto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('search')
  search(@Query('keyword') keyword: string) {
    return this.service.search(keyword);
  }

  @Get('category/:cat')
  category(@Param('cat') cat: string) {
    return this.service.findByCategory(cat);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return this.service.update(id, dto);
  }

  @Put(':id')
  replace(@Param('id', ParseIntPipe) id: number, @Body() dto) {
    return this.service.replace(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(':id/toggle')
  toggle(@Param('id', ParseIntPipe) id: number) {
    return this.service.toggleActive(id);
  }
}