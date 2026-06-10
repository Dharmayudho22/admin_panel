import { Controller, Get, Render, Query, Param, Post, Body, Redirect } from '@nestjs/common';
import { KategoriService } from './kategori.service';

@Controller('kategori')
export class KategoriController {
  constructor(private readonly kategoriService: KategoriService) {}

  @Get()
  @Render('kategori/list')
  async findAll(
    @Query('search')
    search: string,
  ) {
    const kategori = await this.kategoriService.findAll(search);
    return { kategori };
  }

  @Get('create')
  @Render('kategori/create')
  createPage() {
    return {};
  }

  @Post('create')
  @Redirect('/kategori')
  async create(@Body() body: any) {
    await this.kategoriService.create({
      nama: body.name, produk: body.description,
    });
  }

  @Get(':id')
  @Render('kategori/detail')
  async detail(@Param('id') id: string) {
    const kategori = await this.kategoriService.findOne(Number(id));

    return { kategori };
  }

  @Get('edit/:id')
  @Render('kategori/edit')
  async editPage(@Param('id') id: string) {
    const kategori = await this.kategoriService.findOne(Number(id));

    return { kategori };
  }

  @Post('edit/:id')
  @Redirect('/kategori')
  async update(@Param('id') id: string, @Body() body: any) {
    await this.kategoriService.update(Number(id), {
      nama: body.name
    });
  }

  @Get('delete/:id')
  @Redirect('/kategori')
  async remove(@Param('id') id: string) {
    await this.kategoriService.remove(Number(id));
  }
}
