import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CountryDto {
  @ApiProperty({ description: 'Nom du pays', example: 'Japan' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : (value as unknown)))
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'URL du drapeau du pays', example: '/assets/countries/Japan.svg' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : (value as unknown)))
  @IsString()
  @IsNotEmpty()
  flagUrl: string;
}
