import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CharactersService } from '../characters/characters.service';
import { CreateFightDto } from './dto/create-fight.dto';
import { FightDto } from './dto/fight.dto';
import { Fight } from './entities/fight.entity';
import { FightsService } from './fights.service';
import { CharacterNotFoundExceptionFilter } from './filters/character-not-found-exception.filter';
import { MultipleCharactersNotFoundExceptionFilter } from './filters/multiple-characters-not-found-exception.filter';

@Controller('fights')
export class FightsController {
  constructor(
    private readonly fightsService: FightsService,
    private readonly charactersService: CharactersService,
  ) {}

  @ApiOperation({ summary: '🥊 Lancer un combat entre deux personnages' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Combat créé avec succès',
    type: FightDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Un ou les deux personnages n'ont pas été trouvés",
  })
  @Post()
  @UseFilters(
    CharacterNotFoundExceptionFilter,
    MultipleCharactersNotFoundExceptionFilter,
  )
  fight(@Body() createFightDto: CreateFightDto): Fight {
    return this.fightsService.create(
      createFightDto.characterOneId,
      createFightDto.characterTwoId,
    );
  }

  @ApiOperation({ summary: 'Récupérer tous les combats' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retourne tous les combats',
    type: [FightDto],
  })
  @Get()
  findAll(): Fight[] {
    return this.fightsService.findAll();
  }

  @ApiOperation({ summary: "Récupérer tous les combats d'un personnage" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Retourne tous les combats d'un personnage",
    type: [FightDto],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Le personnage n'a pas été trouvé",
  })
  @Get('characters/:characterId')
  @UseFilters(CharacterNotFoundExceptionFilter)
  findByCharacter(@Param('characterId') characterId: string): Fight[] {
    return this.fightsService.findByCharacterId(characterId);
  }
}
