import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Kategori } from '../../kategori/entities/kategori.entity';

@Entity('produk')
export class Produk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categori_id: number;

  @Column()
  nama: string;

  @Column('text')
  deskripsi: string;

  @Column('decimal')
  harga: number;

  @Column()
  stok: number;

  @Column({
    nullable: true,
  })
  gambar: string;

  @ManyToOne(() => Kategori, (kategori) => kategori.produk)
  @JoinColumn({ name: 'categori_id' })
  kategori: Kategori;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
