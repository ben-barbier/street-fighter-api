export class CountryNotFoundException extends Error {
  constructor(name: string) {
    super(`Le pays avec le nom '${name}' n'a pas été trouvé`);
    this.name = 'CountryNotFoundException';
  }
}
