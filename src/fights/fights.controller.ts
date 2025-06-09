import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFightDto } from './dto/create-fight.dto';
import { FightDto } from './dto/fight.dto';
import { Fight } from './entities/fight.entity';
import { FightsService } from './fights.service';

@ApiTags('fights')
@Controller('fights')
export class FightsController {
  constructor(private readonly fightsService: FightsService) {}

  @ApiOperation({ summary: '🥊 Lancer un combat entre deux personnages' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Le combat a été créé avec succès',
    type: FightDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Tentative de combattre un personnage contre lui-même',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Un ou plusieurs personnages n'ont pas été trouvés",
  })
  @Post()
  fight(@Body() createFightDto: CreateFightDto): Fight {
    return this.fightsService.create(createFightDto.characterOneId, createFightDto.characterTwoId);
  }

  @ApiOperation({ summary: 'Récupérer tous les combats' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des combats récupérée avec succès',
    type: [FightDto],
  })
  @Get()
  findAll(): Fight[] {
    return this.fightsService.findAll();
  }

  @ApiOperation({ summary: "Récupérer tous les combats d'un personnage" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Liste des combats d'un personnage récupérée avec succès",
    type: [FightDto],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Le personnage demandé n'a pas été trouvé",
  })
  @Get('characters/:characterId')
  findByCharacter(@Param('characterId') characterId: string): Fight[] {
    return this.fightsService.findByCharacterId(characterId);
  }
}
