import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CountryNotFoundException } from '../exceptions/country-not-found.exception';

@Catch(CountryNotFoundException)
export class CountryNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: CountryNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
      error: 'Not Found',
    });
  }
}
