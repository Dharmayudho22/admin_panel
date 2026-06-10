import { Controller, Body, Get, Post, Render, Redirect, Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('login')
  @Render('auth/login')
  loginPage() {
    return {};
  }

  @Post('login')
  @Redirect('/kategori')
  login(@Body() body: any, @Req() req: any) {
    const email = 'admin@gmail.com';
    const password = 'admin123';

    if (body.email === email && body.password === password) {
      req.session.user = {
        email,
      };
    }

    return {};
  }

  @Get('logout')
  @Render('/auth/login')
  logout(@Req() req: any) {
    req.session.destroy();

    return {};
  }
}
