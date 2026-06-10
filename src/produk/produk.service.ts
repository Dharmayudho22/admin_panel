import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Produk } from './entities/produk.entity';

@Injectable()
export class ProdukService {
  constructor(
    @InjectRepository(Produk)
    private produckRepository: Repository<Produk>,
  ) {}
  async findAll(search?: string) {
    if (search) {
      return this.produckRepository.find({
        where: {
          nama: Like(`%${search}%`),
        },
        relations: {
          kategori: true,
        },
      });
    }
    return this.produckRepository.find({
      relations: {
        kategori: true,
      },
    });
  }

  async findOne(id: number) {
    const produk = await this.produckRepository.findOne({
      where: { id },
      relations: {
        kategori: true,
      },
    });
    if (!produk) {
      throw new NotFoundException('Produk tidak ditemukan');
    }

    return produk;
  }

  async create(data: Partial<Produk>) {
    const produk = this.produckRepository.create(data);

    return this.produckRepository.save(produk);
  }

  async update(id: number, data: Partial<Produk>) {
    await this.findOne(id);

    await this.produckRepository.update(id, data);

    return this.findOne(id);
  }

  async remove(id: number) {
    const produk = await this.findOne(id);

    return this.produckRepository.remove(produk);
  }
}
