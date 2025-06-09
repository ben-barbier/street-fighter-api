import { Module } from '@nestjs/common';
import { CharactersModule } from '../characters/characters.module';
import { FightsController } from './fights.controller';
import { FightsService } from './fights.service';

@Module({
  imports: [CharactersModule],
  controllers: [FightsController],
  providers: [FightsService],
  exports: [FightsService],
})
export class FightsModule {}
