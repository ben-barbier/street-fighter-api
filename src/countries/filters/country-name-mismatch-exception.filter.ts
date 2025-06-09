import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { CountryNameMismatchException } from '../exceptions/country-name-mismatch.exception';

@Catch(CountryNameMismatchException)
export class CountryNameMismatchExceptionFilter implements ExceptionFilter {
  catch(exception: CountryNameMismatchException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400).json({
      statusCode: 400,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}
