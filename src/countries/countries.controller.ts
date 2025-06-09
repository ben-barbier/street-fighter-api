import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/country.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({ summary: 'Créer un nouveau pays' })
  @ApiResponse({
    status: 201,
    description: 'Pays créé avec succès',
  })
  @Post()
  create(@Body() createCountryDto: CreateCountryDto): void {
    return this.countriesService.create(createCountryDto);
  }

  @ApiOperation({ summary: 'Récupérer tous les pays' })
  @ApiResponse({
    status: 200,
    description: 'Liste des pays',
    type: [CountryDto],
  })
  @Get()
  findAll(): CountryDto[] {
    return this.countriesService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer un pays par son nom' })
  @ApiResponse({
    status: 200,
    description: 'Détails du pays',
    type: CountryDto,
  })
  @Get(':name')
  findOne(@Param('name') name: string): CountryDto | undefined {
    return this.countriesService.findOne(name);
  }

  @ApiOperation({ summary: 'Mettre à jour un pays' })
  @ApiResponse({
    status: 200,
    description: 'Pays mis à jour avec succès',
  })
  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ): void {
    return this.countriesService.update(name, updateCountryDto);
  }

  @ApiOperation({ summary: 'Supprimer un pays' })
  @ApiResponse({
    status: 200,
    description: 'Pays supprimé avec succès',
  })
  @Delete(':name')
  remove(@Param('name') name: string): void {
    return this.countriesService.remove(name);
  }
}
