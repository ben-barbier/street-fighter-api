export class CharacterNotFoundException extends Error {
  constructor(id: string) {
    super(`Le personnage avec l'ID '${id}' n'a pas été trouvé`);
    this.name = 'CharacterNotFoundException';
  }
}
