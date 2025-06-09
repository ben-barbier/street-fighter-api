import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateFightDto } from './dto/create-fight.dto';
import { FightDto } from './dto/fight.dto';
import { Fight } from './entities/fight.entity';
import { FightsService } from './fights.service';

@Controller('fights')
export class FightsController {
  constructor(private readonly fightsService: FightsService) {}

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
  findByCharacter(@Param('characterId') characterId: string): Fight[] {
    return this.fightsService.findByCharacterId(characterId);
  }
}
