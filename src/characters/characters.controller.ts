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
import { CharactersService } from './characters.service';
import { CharacterDto } from './dto/character.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { DuplicateCharacterIdExceptionFilter } from './filters/duplicate-character-id-exception.filter';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @ApiOperation({ summary: 'Créer un nouveau personnage' })
  @ApiResponse({
    status: 201,
    description: 'Personnage créé avec succès',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation échouée (données manquantes ou invalides)',
  })
  @Post()
  @UseFilters(DuplicateCharacterIdExceptionFilter)
  create(@Body() createCharacterDto: CreateCharacterDto): void {
    return this.charactersService.create(createCharacterDto);
  }

  @ApiOperation({ summary: 'Récupérer tous les personnages' })
  @ApiResponse({
    status: 200,
    description: 'Liste des personnages',
    type: [CharacterDto],
  })
  @Get()
  findAll(): CharacterDto[] {
    return this.charactersService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer un personnage par son identifiant' })
  @ApiResponse({
    status: 200,
    description: 'Détails du personnage',
    type: CharacterDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Personnage non trouvé',
  })
  @Get(':id')
  findOne(@Param('id') id: string): CharacterDto {
    const character = this.charactersService.findOne(id);
    if (!character) {
      throw new NotFoundException('Personnage non trouvé');
    }
    return character;
  }

  @ApiOperation({ summary: 'Mettre à jour un personnage' })
  @ApiResponse({
    status: 204,
    description: 'Personnage mis à jour avec succès',
  })
  @ApiResponse({
    status: 400,
    description:
      "L'identifiant du corps de la requête ne correspond pas à celui de l'URL.",
  })
  @ApiResponse({
    status: 404,
    description: 'Personnage non trouvé',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): void {
    if ('id' in updateCharacterDto && updateCharacterDto.id !== id) {
      throw new BadRequestException(
        "L'identifiant du corps de la requête ne correspond pas à celui de l'URL.",
      );
    }

    const character = this.charactersService.findOne(id);
    if (!character) {
      throw new NotFoundException('Personnage non trouvé');
    }

    return this.charactersService.update(id, updateCharacterDto);
  }

  @ApiOperation({ summary: 'Supprimer un personnage' })
  @ApiResponse({
    status: 204,
    description: 'Personnage supprimé avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Personnage non trouvé',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    const character = this.charactersService.findOne(id);
    if (!character) {
      throw new NotFoundException('Personnage non trouvé');
    }
    return this.charactersService.remove(id);
  }
}
