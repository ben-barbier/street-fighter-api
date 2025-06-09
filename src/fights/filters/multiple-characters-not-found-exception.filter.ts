import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MultipleCharactersNotFoundException } from '../exceptions/multiple-characters-not-found.exception';

@Catch(MultipleCharactersNotFoundException)
export class MultipleCharactersNotFoundExceptionFilter
  implements ExceptionFilter
{
  catch(exception: MultipleCharactersNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
      error: 'Not Found',
    });
  }
}
