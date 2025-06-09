export class CharacterHasFightsException extends Error {
  constructor(public readonly id: string) {
    super(
      `Le personnage avec l'ID '${id}' ne peut pas être supprimé car il a des combats à son actif.`,
    );
  }
}
