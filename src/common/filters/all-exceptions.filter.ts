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
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Code de statut HTTP par défaut
    const message = exception.message;
    let error = 'Internal Server Error';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    // Détermination du code de statut HTTP approprié selon le type d'exception
    if (
      exception instanceof CountryNameMismatchException ||
      exception instanceof CharacterIdMismatchException ||
      exception instanceof SameCharacterFightException
    ) {
      // Erreurs de validation/mauvaise requête
      error = 'Bad Request';
      statusCode = HttpStatus.BAD_REQUEST;
    } else if (
      exception instanceof CountryNotFoundException ||
      exception instanceof CharacterNotFoundException ||
      exception instanceof MultipleCharactersNotFoundException
    ) {
      // Ressources non trouvées
      error = 'Not Found';
      statusCode = HttpStatus.NOT_FOUND;
    } else if (
      exception instanceof DuplicateCountryNameException ||
      exception instanceof DuplicateCharacterIdException ||
      exception instanceof CharacterHasFightsException ||
      exception instanceof CountryHasCharactersException
    ) {
      // Conflits avec l'état actuel des ressources
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
