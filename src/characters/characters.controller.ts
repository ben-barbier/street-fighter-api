import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CharactersService } from './characters.service';
import { CharacterDto } from './dto/character.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterIdMismatchException } from './exceptions/character-id-mismatch.exception';
import { CharacterNotFoundException } from './exceptions/character-not-found.exception';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @ApiOperation({ summary: 'Créer un nouveau personnage' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Le personnage a été créé avec succès',
    type: CharacterDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides (validation échouée)',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Un personnage avec cet identifiant existe déjà',
  })
  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto): CharacterDto {
    return this.charactersService.create(createCharacterDto);
  }

  @ApiOperation({ summary: 'Récupérer tous les personnages' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des personnages récupérée avec succès',
    type: [CharacterDto],
  })
  @Get()
  findAll(): CharacterDto[] {
    return this.charactersService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer un personnage par son identifiant' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Détails du personnage récupérés avec succès',
    type: CharacterDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Le personnage demandé n'a pas été trouvé",
  })
  @Get(':id')
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
    description: 'Le personnage a été mis à jour avec succès',
    type: CharacterDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "L'identifiant dans le corps de la requête ne correspond pas à celui de l'URL",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Le personnage demandé n'a pas été trouvé",
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto): CharacterDto {
    if ('id' in updateCharacterDto && updateCharacterDto.id !== id) {
      throw new CharacterIdMismatchException(id, updateCharacterDto.id!);
    }

    return this.charactersService.update(id, updateCharacterDto);
  }

  @ApiOperation({ summary: 'Supprimer un personnage' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Le personnage a été supprimé avec succès',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Le personnage demandé n'a pas été trouvé",
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Le personnage est impliqué dans des combats et ne peut pas être supprimé',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    return this.charactersService.remove(id);
  }
}
