import {
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
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/country.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryNameMismatchException } from './exceptions/country-name-mismatch.exception';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({ summary: 'Créer un nouveau pays' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Pays créé avec succès',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation échouée (données manquantes ou invalides)',
  })
  @Post()
  create(@Body() createCountryDto: CreateCountryDto): CreateCountryDto {
    return this.countriesService.create(createCountryDto);
  }

  @ApiOperation({ summary: 'Récupérer tous les pays' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des pays',
    type: [CountryDto],
  })
  @Get()
  findAll(): CountryDto[] {
    return this.countriesService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer un pays par son nom' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Détails du pays',
    type: CountryDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
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
    status: HttpStatus.OK,
    description: 'Pays mis à jour avec succès',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      "Le nom du corps de la requête ne correspond pas à celui de l'URL.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pays non trouvé',
  })
  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ): UpdateCountryDto {
    if ('name' in updateCountryDto && updateCountryDto.name !== name) {
      throw new CountryNameMismatchException();
    }

    return this.countriesService.update(name, updateCountryDto);
  }

  @ApiOperation({ summary: 'Supprimer un pays' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Pays supprimé avec succès',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
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
