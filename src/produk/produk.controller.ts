import { Controller, Get, Render, Query, Param, Post, Body, Redirect } from '@nestjs/common';
import { ProdukService } from './produk.service';
import { KategoriService } from 'src/kategori/kategori.service';

@Controller('produk')
export class ProdukController {
  constructor(
    private readonly produkService: ProdukService,
    private readonly kategoriService: KategoriService,
  ) {}

  @Get()
  @Render('produk/list')
  async findAll(
    @Query('search')
    search: string,
  ) {
    const produk = await this.produkService.findAll(search);

    return { produk };
  }

  @Get('create')
  @Render('produk/create')
  async createPage() {
    const kategori = await this.kategoriService.findAll();

    return { kategori };
  }

  @Post('create')
  @Redirect('/produk')
  async create(@Body() body: any) {
    await this.produkService.create({
      nama: body.nama,
      deskripsi: body.deskripsi,
      harga: body.harga,
      stok: body.stok,
      category_id: Number(body.category_id),
    });
  }

  @Get(':id')
  @Render('produk/detail')
  async detail(@Param('id') id: string) {
    const produk = await this.produkService.findOne(Number(id));

    return { produk };
  }

  @Get('edit/:id')
  @Render('produk/edit')
  async editPage(@Param('id') id: string) {
    const produk = await this.produkService.findOne(Number(id));

    const kategori = await this.kategoriService.findAll();

    return { produk, kategori };
  }

  @Post('edit/:id')
  @Redirect('/produk')
  async update(@Param('id') id: string, @Body() body: any) {
    console.log('ID:', id);
    console.log(body);

    await this.produkService.update(Number(id), {
      nama: body.nama,
      deskripsi: body.deskripsi,
      harga: Number(body.harga),
      stok: Number(body.stok),
      category_id: Number(body.category_id,),})
  }

  @Get('delete/:id')
  @Redirect('/produk')
  async remove(@Param('id') id: string) {
    await this.produkService.remove(Number(id));
  }
}
