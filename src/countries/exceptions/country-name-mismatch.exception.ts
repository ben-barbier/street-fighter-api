import { BadRequestException } from '@nestjs/common';

export class CountryNameMismatchException extends BadRequestException {
  constructor() {
    super("Le nom du corps de la requête ne correspond pas à celui de l'URL.");
  }
}
