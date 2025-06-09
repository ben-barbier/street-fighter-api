import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CountryDto {
  @ApiProperty({
    description: 'Nom du pays',
    example: 'Japan',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : (value as unknown),
  )
  name: string;

  @ApiProperty({
    description: 'URL du drapeau du pays',
    example: '/assets/countries/Japan.svg',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : (value as unknown),
  )
  flagUrl: string;
}
