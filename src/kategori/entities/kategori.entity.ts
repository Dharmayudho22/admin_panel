import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Produk } from '../../produk/entities/produk.entity';

@Entity('kategori')
export class Kategori {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @OneToMany(() => Produk, (produk) => produk.kategori)
  produk: Produk[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
