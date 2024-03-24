import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
import { countries } from './countries.data';

@Injectable()
export class CountriesService {
  private countries: Country[] = countries();

  public create(createCountryDto: CreateCountryDto): void {
    this.countries = this.countries.concat(createCountryDto);
  }

  public findAll(): Country[] {
    return this.countries;
  }

  public findOne(name: string): Country {
    return this.countries.find((country) => country.name === name);
  }

  public update(id: number, updateCountryDto: UpdateCountryDto): void {
    this.countries = this.countries.map((country) => {
      if (country.name === updateCountryDto.name) {
        return { ...country, ...updateCountryDto };
      }
      return country;
    });
  }

  public remove(name: string): void {
    this.countries = this.countries.filter((country) => country.name !== name);
  }
}
