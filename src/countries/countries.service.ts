import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CharactersService } from '../characters/characters.service';
import { countries } from './countries.data';
import { CountryDto } from './dto/country.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
import { CountryHasCharactersException } from './exceptions/country-has-characters.exception';
import { CountryNotFoundException } from './exceptions/country-not-found.exception';
import { DuplicateCountryNameException } from './exceptions/duplicate-country-name.exception';

@Injectable()
export class CountriesService {
  private countries: Country[] = countries();

  constructor(
    @Inject(forwardRef(() => CharactersService))
    private readonly charactersService: CharactersService
  ) {}

  public create(newCountry: CreateCountryDto): CountryDto {
    // Vérification de l'existence d'un pays avec le même nom
    if (this.countries.some(country => country.name === newCountry.name)) {
      throw new DuplicateCountryNameException(newCountry.name);
    }

    // Ajout du pays
    this.countries = this.countries.concat(newCountry);

    return newCountry;
  }

  public findAll(): Country[] {
    return this.countries;
  }

  public findOne(name: string): Country | undefined {
    return this.countries.find(country => country.name === name);
  }

  public update(name: string, updateCountryDto: UpdateCountryDto): UpdateCountryDto {
    const country = this.findOne(name);
    if (!country) {
      throw new CountryNotFoundException(name);
    }

    this.countries = this.countries.map(country => {
      if (country.name === name) {
        return { ...country, ...updateCountryDto };
      }
      return country;
    });

    return updateCountryDto;
  }

  public remove(name: string): void {
    // Vérifier si le pays existe
    const country = this.findOne(name);
    if (!country) {
      throw new CountryNotFoundException(name);
    }

    // Vérifier si des personnages sont associés à ce pays
    const hasCountryCharacters = this.charactersService.findAll().some(character => character.country === name);

    if (hasCountryCharacters) {
      throw new CountryHasCharactersException(name);
    }

    // Si aucun personnage n'utilise ce pays, on peut le supprimer
    this.countries = this.countries.filter(country => country.name !== name);
  }
}
