import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CountryDto {
  @ApiProperty({
    description: 'Nom du pays',
    example: 'Japan',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'URL du drapeau du pays',
    example: '/assets/countries/Japan.svg',
  })
  @IsString()
  @IsNotEmpty()
  flagUrl: string;
}
