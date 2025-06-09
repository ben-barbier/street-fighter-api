export class CountryHasCharactersException extends Error {
  constructor(countryName: string) {
    super(
      `Le pays ${countryName} est associé à des personnages et ne peut pas être supprimé`,
    );
  }
}
