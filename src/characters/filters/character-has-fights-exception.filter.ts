import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CharacterHasFightsException } from '../exceptions/character-has-fights.exception';

@Catch(CharacterHasFightsException)
export class CharacterHasFightsExceptionFilter implements ExceptionFilter {
  catch(exception: CharacterHasFightsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: exception.message,
      error: 'Conflict',
      characterId: exception.id,
    });
  }
}
