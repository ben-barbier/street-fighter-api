export class CharacterIdMismatchException extends Error {
  constructor(urlId: string, bodyId: string) {
    super(`L'identifiant '${bodyId}' du corps de la requête ne correspond pas à celui de l'URL '${urlId}'.`);
  }
}
