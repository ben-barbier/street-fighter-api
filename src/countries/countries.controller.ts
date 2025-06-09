import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/country.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryNameMismatchException } from './exceptions/country-name-mismatch.exception';
import { CountryNotFoundException } from './exceptions/country-not-found.exception';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({ summary: 'Créer un nouveau pays' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Le pays a été créé avec succès',
    type: CountryDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides (validation échouée)',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Un pays avec ce nom existe déjà',
  })
  @Post()
  create(@Body() createCountryDto: CreateCountryDto): CreateCountryDto {
    return this.countriesService.create(createCountryDto);
  }

  @ApiOperation({ summary: 'Récupérer tous les pays' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des pays récupérée avec succès',
    type: [CountryDto],
  })
  @Get()
  findAll(): CountryDto[] {
    return this.countriesService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer un pays par son nom' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Détails du pays récupérés avec succès',
    type: CountryDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Le pays demandé n'a pas été trouvé",
  })
  @Get(':name')
  findOne(@Param('name') name: string): CountryDto {
    const country = this.countriesService.findOne(name);
    if (!country) {
      throw new CountryNotFoundException(name);
    }
    return country;
  }

  @ApiOperation({ summary: 'Mettre à jour un pays' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Le pays a été mis à jour avec succès',
    type: CountryDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      "Le nom dans le corps de la requête ne correspond pas à celui de l'URL",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Le pays demandé n'a pas été trouvé",
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
    description: 'Le pays a été supprimé avec succès',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Le pays demandé n'a pas été trouvé",
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:
      'Le pays est associé à des personnages et ne peut pas être supprimé',
  })
  @Delete(':name')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('name') name: string): void {
    return this.countriesService.remove(name);
  }
}
