export class MultipleCharactersNotFoundException extends Error {
  constructor(ids: string[]) {
    super(
      `Les personnages avec les IDs suivants n'ont pas été trouvés : ${ids.join(', ')}`,
    );
  }
}
