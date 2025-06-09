import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CharacterIdMismatchException } from '../exceptions/character-id-mismatch.exception';

@Catch(CharacterIdMismatchException)
export class CharacterIdMismatchExceptionFilter implements ExceptionFilter {
  catch(exception: CharacterIdMismatchException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}
