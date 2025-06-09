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
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CharactersService } from './characters.service';
import { CharacterDto } from './dto/character.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterIdMismatchException } from './exceptions/character-id-mismatch.exception';
import { CharacterNotFoundException } from './exceptions/character-not-found.exception';
import { CharacterHasFightsExceptionFilter } from './filters/character-has-fights-exception.filter';
import { CharacterIdMismatchExceptionFilter } from './filters/character-id-mismatch-exception.filter';
import { CharacterNotFoundExceptionFilter } from './filters/character-not-found-exception.filter';
import { DuplicateCharacterIdExceptionFilter } from './filters/duplicate-character-id-exception.filter';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @ApiOperation({ summary: 'Créer un nouveau personnage' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Personnage créé avec succès',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation échouée (données manquantes ou invalides)',
  })
  @Post()
  @UseFilters(DuplicateCharacterIdExceptionFilter)
  create(@Body() createCharacterDto: CreateCharacterDto): CharacterDto {
    return this.charactersService.create(createCharacterDto);
  }

  @ApiOperation({ summary: 'Récupérer tous les personnages' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des personnages',
    type: [CharacterDto],
  })
  @Get()
  findAll(): CharacterDto[] {
    return this.charactersService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer un personnage par son identifiant' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Détails du personnage',
    type: CharacterDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Personnage non trouvé',
  })
  @Get(':id')
  @UseFilters(CharacterNotFoundExceptionFilter)
  findOne(@Param('id') id: string): CharacterDto {
    const character = this.charactersService.findOne(id);
    if (!character) {
      throw new CharacterNotFoundException(id);
    }
    return character;
  }

  @ApiOperation({ summary: 'Mettre à jour un personnage' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Personnage mis à jour avec succès',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      "L'identifiant du corps de la requête ne correspond pas à celui de l'URL.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Personnage non trouvé',
  })
  @Patch(':id')
  @UseFilters(
    CharacterNotFoundExceptionFilter,
    CharacterIdMismatchExceptionFilter,
    DuplicateCharacterIdExceptionFilter,
  )
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): CharacterDto {
    if ('id' in updateCharacterDto && updateCharacterDto.id !== id) {
      throw new CharacterIdMismatchException(id, updateCharacterDto.id!);
    }

    return this.charactersService.update(id, updateCharacterDto);
  }

  @ApiOperation({ summary: 'Supprimer un personnage' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Personnage supprimé avec succès',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Personnage non trouvé',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:
      'Le personnage est impliqué dans des combats et ne peut pas être supprimé',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseFilters(
    CharacterNotFoundExceptionFilter,
    CharacterHasFightsExceptionFilter,
  )
  remove(@Param('id') id: string): void {
    return this.charactersService.remove(id);
  }
}
