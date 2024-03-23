import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [CharactersModule, CountriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
