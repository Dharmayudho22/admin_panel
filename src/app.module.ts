import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { KategoriModule } from './kategori/kategori.module';
import { ProdukModule } from './produk/produk.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'admin_panel',
      autoLoadEntities: true,
      synchronize: true,
    }),

    AuthModule,
    KategoriModule,
    ProdukModule,
    UserModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
