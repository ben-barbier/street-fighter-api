export class SameCharacterFightException extends Error {
  constructor(characterId: string) {
    super(
      `Le combat ne peut pas être créé entre le même personnage (ID: ${characterId})`,
    );
    this.name = 'SameCharacterFightException';
  }
}
