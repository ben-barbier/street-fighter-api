import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DuplicateCountryNameException } from '../exceptions/duplicate-country-name.exception';

@Catch(DuplicateCountryNameException)
export class DuplicateCountryNameExceptionFilter implements ExceptionFilter {
  catch(exception: DuplicateCountryNameException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}
