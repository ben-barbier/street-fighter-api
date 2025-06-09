import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CharacterNotFoundException } from '../exceptions/character-not-found.exception';

@Catch(CharacterNotFoundException)
export class CharacterNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: CharacterNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
      error: 'Not Found',
    });
  }
}
