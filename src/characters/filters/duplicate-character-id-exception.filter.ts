import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DuplicateCharacterIdException } from '../exceptions/duplicate-character-id.exception';

@Catch(DuplicateCharacterIdException)
export class DuplicateCharacterIdExceptionFilter implements ExceptionFilter {
  catch(exception: DuplicateCharacterIdException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}
