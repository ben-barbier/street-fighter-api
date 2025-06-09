import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  private static readonly MAX_DELAY_MS = 300;

  use(req: Request, res: Response, next: (error?: Error) => void) {
    const delay = Math.floor(
      Math.random() * Math.floor(DelayMiddleware.MAX_DELAY_MS),
    );
    setTimeout(next, delay);
  }
}
