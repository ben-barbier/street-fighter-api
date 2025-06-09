import { forwardRef, Module } from '@nestjs/common';
import { FightsModule } from '../fights/fights.module';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

@Module({
  imports: [forwardRef(() => FightsModule)],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
