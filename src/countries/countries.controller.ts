import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  create(@Body() createCountryDto: CreateCountryDto): void {
    return this.countriesService.create(createCountryDto);
  }

  @Get()
  findAll(): Country[] {
    return this.countriesService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Country {
    return this.countriesService.findOne(name);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ): void {
    return this.countriesService.update(+id, updateCountryDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string): void {
    return this.countriesService.remove(name);
  }
}
