import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const publicRoutes = ['/auth/login'];
    if (publicRoutes.includes(req.path)) {
      return next();
    }

    if (!req.session?.user) {
      return res.redirect('/auth/login');
    }
    next();
  }
}
