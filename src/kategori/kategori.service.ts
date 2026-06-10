import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Kategori } from './entities/kategori.entity';

@Injectable()
export class KategoriService {
  constructor(
    @InjectRepository(Kategori)
    private kategoriRepository: Repository<Kategori>,
  ) {}
  async findAll(search?: string) {
    if (search) {
      return this.kategoriRepository.find({
        where: {
          nama: Like(`%${search}%`),
        },
      });
    }
    return this.kategoriRepository.find();
  }

  async findOne(id: number) {
    const kategori = await this.kategoriRepository.findOne({
      where: { id },
    });

    if (!kategori) {
      throw new NotFoundException('Kategori tidak di temukan');
    }
    return kategori;
  }

  async create(data: Partial<Kategori>) {
    const kategori = this.kategoriRepository.create(data);

    return this.kategoriRepository.save(kategori);
  }

  async update(id: number, data: Partial<Kategori>) {
    await this.findOne(id);

    await this.kategoriRepository.update(id, data);

    return this.findOne(id);
  }

  async remove(id: number) {
    const kategori = await this.findOne(id);

    return this.kategoriRepository.remove(kategori);
  }
}
