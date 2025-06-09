import { Module } from '@nestjs/common';
import { CharactersService } from '../characters/characters.service';
import { FightsController } from './fights.controller';
import { FightsService } from './fights.service';

@Module({
  imports: [],
  controllers: [FightsController],
  providers: [FightsService, CharactersService],
  exports: [FightsService],
})
export class FightsModule {}
