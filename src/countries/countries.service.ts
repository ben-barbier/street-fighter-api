import { Injectable } from '@nestjs/common';
import { countries } from './countries.data';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
import { CountryNotFoundException } from './exceptions/country-not-found.exception';
import { DuplicateCountryNameException } from './exceptions/duplicate-country-name.exception';

@Injectable()
export class CountriesService {
  private countries: Country[] = countries();

  public create(createCountryDto: CreateCountryDto): CreateCountryDto {
    // Vérification de l'existence d'un pays avec le même nom
    if (
      this.countries.some((country) => country.name === createCountryDto.name)
    ) {
      throw new DuplicateCountryNameException(createCountryDto.name);
    }

    // Ajout du pays
    this.countries = this.countries.concat(createCountryDto);

    return createCountryDto;
  }

  public findAll(): Country[] {
    return this.countries;
  }

  public findOne(name: string): Country | undefined {
    return this.countries.find((country) => country.name === name);
  }

  public update(
    name: string,
    updateCountryDto: UpdateCountryDto,
  ): UpdateCountryDto {
    const country = this.findOne(name);
    if (!country) {
      throw new CountryNotFoundException(name);
    }

    this.countries = this.countries.map((country) => {
      if (country.name === name) {
        return { ...country, ...updateCountryDto };
      }
      return country;
    });

    return updateCountryDto;
  }

  public remove(name: string): void {
    this.countries = this.countries.filter((country) => country.name !== name);
  }
}
