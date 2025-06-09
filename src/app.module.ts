import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CharactersModule } from './characters/characters.module';
import { CountriesModule } from './countries/countries.module';
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
