import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Products } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private repo: Repository<Products>,
  ) {}

  async create(dto) {
    const data = await this.repo.save(dto);
    return { message: 'Created', data };
  }

  async findAll() {
    const data = await this.repo.find({
      order: { createdAt: 'DESC' },
    });
    return { message: 'All', count: data.length, data };
  }

  async findOne(id: number) {
    const data = await this.repo.findOne({ where: { id } });
    if (!data) throw new NotFoundException('Not found');
    return { message: 'One', data };
  }

  async update(id: number, dto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async replace(id: number, dto) {
    const old = await this.findOne(id);
    const data = await this.repo.save({ ...old.data, ...dto, id });
    return { message: 'Replaced', data };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { message: 'Deleted', id };
  }

  async findByCategory(category: string) {
    const data = await this.repo.find({ where: { category } });
    return { message: 'Category', count: data.length, data };
  }

  async search(keyword: string) {
    const data = await this.repo.find({
      where: { name: ILike(`%${keyword}%`) },
    });
    return { message: 'Search', count: data.length, data };
  }

  async toggleActive(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException();

    product.isActive = !product.isActive;
    const data = await this.repo.save(product);

    return { message: 'Toggled', data };
  }
}