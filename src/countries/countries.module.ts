import { Module, forwardRef } from '@nestjs/common';
import { CharactersModule } from '../characters/characters.module';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

@Module({
  imports: [forwardRef(() => CharactersModule)],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
