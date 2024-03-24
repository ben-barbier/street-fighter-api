import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto): void {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  findAll(): Character[] {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Character {
    return this.charactersService.findOne(id);
  }

  @Get(':id/fight')
  fight(
    @Param('id') characterId: string,
    @Query('versus') versusId: string,
  ): Character {
    return this.charactersService.fight(characterId, versusId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): void {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.charactersService.remove(id);
  }
}
