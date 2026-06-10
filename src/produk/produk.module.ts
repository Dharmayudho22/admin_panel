import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Produk } from './entities/produk.entity';
import { ProdukController } from './produk.controller';
import { ProdukService } from './produk.service';
import { KategoriModule } from 'src/kategori/kategori.module';

@Module({
  imports: [TypeOrmModule.forFeature([Produk]), KategoriModule],
  controllers: [ProdukController],
  providers: [ProdukService],
})
export class ProdukModule {}
