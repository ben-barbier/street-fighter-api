import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { CountriesModule } from './countries/countries.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DelayMiddleware } from './middlewares/delay.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', '/client'),
    }),
    CharactersModule,
    CountriesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DelayMiddleware).forRoutes('characters', 'countries');
  }
}
