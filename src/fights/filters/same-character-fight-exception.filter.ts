import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { SameCharacterFightException } from '../exceptions/same-character-fight.exception';

@Catch(SameCharacterFightException)
export class SameCharacterFightExceptionFilter implements ExceptionFilter {
  catch(exception: SameCharacterFightException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}
