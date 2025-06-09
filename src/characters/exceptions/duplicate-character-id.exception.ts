export class DuplicateCharacterIdException extends Error {
  constructor(id: string) {
    super(`Un personnage avec l'ID '${id}' existe déjà`);
    this.name = 'DuplicateCharacterIdException';
  }
}
