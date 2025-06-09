import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/country.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { DuplicateCountryNameExceptionFilter } from './filters/duplicate-country-name-exception.filter';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({ summary: 'Créer un nouveau pays' })
  @ApiResponse({
    status: 201,
    description: 'Pays créé avec succès',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation échouée (données manquantes ou invalides)',
  })
  @Post()
  @UseFilters(DuplicateCountryNameExceptionFilter)
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
  @ApiResponse({
    status: 404,
    description: 'Pays non trouvé',
  })
  @Get(':name')
  findOne(@Param('name') name: string): CountryDto {
    const country = this.countriesService.findOne(name);
    if (!country) {
      throw new NotFoundException('Pays non trouvé');
    }
    return country;
  }

  @ApiOperation({ summary: 'Mettre à jour un pays' })
  @ApiResponse({
    status: 204,
    description: 'Pays mis à jour avec succès',
  })
  @ApiResponse({
    status: 400,
    description:
      "Le nom du corps de la requête ne correspond pas à celui de l'URL.",
  })
  @Patch(':name')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('name') name: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ): void {
    if ('name' in updateCountryDto && updateCountryDto.name !== name) {
      throw new BadRequestException(
        "Le nom du corps de la requête ne correspond pas à celui de l'URL.",
      );
    }

    return this.countriesService.update(name, updateCountryDto);
  }

  @ApiOperation({ summary: 'Supprimer un pays' })
  @ApiResponse({
    status: 204,
    description: 'Pays supprimé avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Pays non trouvé',
  })
  @Delete(':name')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('name') name: string): void {
    const country = this.countriesService.findOne(name);
    if (!country) {
      throw new NotFoundException('Pays non trouvé');
    }
    return this.countriesService.remove(name);
  }
}
