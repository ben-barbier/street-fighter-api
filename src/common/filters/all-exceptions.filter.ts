import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CharacterHasFightsException } from '../../characters/exceptions/character-has-fights.exception';
import { CharacterIdMismatchException } from '../../characters/exceptions/character-id-mismatch.exception';
import { CharacterNotFoundException } from '../../characters/exceptions/character-not-found.exception';
import { DuplicateCharacterIdException } from '../../characters/exceptions/duplicate-character-id.exception';
import { CountryHasCharactersException } from '../../countries/exceptions/country-has-characters.exception';
import { CountryNameMismatchException } from '../../countries/exceptions/country-name-mismatch.exception';
import { CountryNotFoundException } from '../../countries/exceptions/country-not-found.exception';
import { DuplicateCountryNameException } from '../../countries/exceptions/duplicate-country-name.exception';
import { MultipleCharactersNotFoundException } from '../../fights/exceptions/multiple-characters-not-found.exception';
import { SameCharacterFightException } from '../../fights/exceptions/same-character-fight.exception';

/**
 * Filtre global qui centralise la gestion de toutes les exceptions personnalisées de l'application
 * Évite d'avoir à appliquer des filtres d'exception individuellement sur chaque contrôleur/méthode
 * Assure une cohérence dans le traitement des erreurs à travers toute l'API
 */
@Catch(
  // Exceptions liées aux personnages
  CharacterHasFightsException,
  CharacterIdMismatchException,
  CharacterNotFoundException,
  DuplicateCharacterIdException,

  // Exceptions liées aux pays
  CountryNameMismatchException,
  CountryNotFoundException,
  DuplicateCountryNameException,
  CountryHasCharactersException,

  // Exceptions liées aux combats
  MultipleCharactersNotFoundException,
  SameCharacterFightException
)
export class AllExceptionsFilter implements ExceptionFilter {
  // Exceptions correspondant aux erreurs de validation/mauvaise requête (400 Bad Request)
  private readonly badRequestExceptions = [
    CountryNameMismatchException,
    CharacterIdMismatchException,
    SameCharacterFightException,
  ];

  // Exceptions correspondant aux ressources non trouvées (404 Not Found)
  private readonly notFoundExceptions = [
    CountryNotFoundException,
    CharacterNotFoundException,
    MultipleCharactersNotFoundException,
  ];

  // Exceptions correspondant aux conflits avec l'état actuel des ressources (409 Conflict)
  private readonly conflictExceptions = [
    DuplicateCountryNameException,
    DuplicateCharacterIdException,
    CharacterHasFightsException,
    CountryHasCharactersException,
  ];

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Code de statut HTTP par défaut
    const message = exception.message;
    let error = 'Internal Server Error';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    // Détermination du code de statut HTTP approprié selon le type d'exception
    if (this.badRequestExceptions.some(exceptionType => exception instanceof exceptionType)) {
      error = 'Bad Request';
      statusCode = HttpStatus.BAD_REQUEST;
    } else if (this.notFoundExceptions.some(exceptionType => exception instanceof exceptionType)) {
      error = 'Not Found';
      statusCode = HttpStatus.NOT_FOUND;
    } else if (this.conflictExceptions.some(exceptionType => exception instanceof exceptionType)) {
      error = 'Conflict';
      statusCode = HttpStatus.CONFLICT;
    }

    // Construction de la réponse d'erreur standardisée
    response.status(statusCode).json({
      message: [message],
      error,
      statusCode,
    });
  }
}
