export class DuplicateCountryNameException extends Error {
  constructor(name: string) {
    super(`Un pays avec le nom '${name}' existe déjà`);
  }
}
