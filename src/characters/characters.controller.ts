import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CharactersService } from './characters.service';
import { CharacterDto } from './dto/character.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @ApiOperation({ summary: 'Créer un nouveau personnage' })
  @ApiResponse({
    status: 201,
    description: 'Personnage créé avec succès',
  })
  @Post()
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
  @Get(':id')
  findOne(@Param('id') id: string): CharacterDto | undefined {
    return this.charactersService.findOne(id);
  }

  @ApiOperation({ summary: '🥊 Lancer un combat entre deux personnages' })
  @ApiResponse({
    status: 200,
    description: 'Résultat du combat entre les personnages',
    type: CharacterDto,
  })
  @Get(':id/fight')
  fight(
    @Param('id') characterId: string,
    @Query('versus') versusId: string,
  ): CharacterDto | undefined {
    return this.charactersService.fight(characterId, versusId);
  }

  @ApiOperation({ summary: 'Mettre à jour un personnage' })
  @ApiResponse({
    status: 200,
    description: 'Personnage mis à jour avec succès',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): void {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @ApiOperation({ summary: 'Supprimer un personnage' })
  @ApiResponse({
    status: 204,
    description: 'Personnage supprimé avec succès',
  })
  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.charactersService.remove(id);
  }
}
