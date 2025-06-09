import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CharactersService } from '../characters/characters.service';
import { CreateFightDto } from './dto/create-fight.dto';
import { FightDto } from './dto/fight.dto';
import { Fight } from './entities/fight.entity';
import { FightsService } from './fights.service';

@Controller('fights')
export class FightsController {
  constructor(
    private readonly fightsService: FightsService,
    private readonly charactersService: CharactersService,
  ) {}

  @ApiOperation({ summary: '🥊 Lancer un combat entre deux personnages' })
  @ApiResponse({
    status: 201,
    description: 'Combat créé avec succès',
    type: FightDto,
  })
  @ApiResponse({
    status: 404,
    description: "Un ou les deux personnages n'ont pas été trouvés",
  })
  @Post()
  fight(@Body() createFightDto: CreateFightDto): Fight {
    const characterOne = this.charactersService.findOne(
      createFightDto.characterOneId,
    );
    const characterTwo = this.charactersService.findOne(
      createFightDto.characterTwoId,
    );

    if (!characterOne || !characterTwo) {
      throw new NotFoundException(
        !characterOne && !characterTwo
          ? `Les personnages avec les IDs '${createFightDto.characterOneId}' et '${createFightDto.characterTwoId}' n'ont pas été trouvés`
          : !characterOne
            ? `Le personnage avec l'ID '${createFightDto.characterOneId}' n'a pas été trouvé`
            : `Le personnage avec l'ID '${createFightDto.characterTwoId}' n'a pas été trouvé`,
      );
    }

    return this.fightsService.create(
      createFightDto.characterOneId,
      createFightDto.characterTwoId,
    );
  }

  @ApiOperation({ summary: 'Récupérer tous les combats' })
  @ApiResponse({
    status: 200,
    description: 'Retourne tous les combats',
    type: [FightDto],
  })
  @Get()
  findAll(): Fight[] {
    return this.fightsService.findAll();
  }

  @ApiOperation({ summary: "Récupérer tous les combats d'un personnage" })
  @ApiResponse({
    status: 200,
    description: "Retourne tous les combats d'un personnage",
    type: [FightDto],
  })
  @Get('characters/:characterId')
  findByCharacter(@Param('characterId') characterId: string): Fight[] {
    const character = this.charactersService.findOne(characterId);
    if (!character) {
      throw new NotFoundException('Personnage non trouvé');
    }

    return this.fightsService.findByCharacterId(characterId);
  }
}
