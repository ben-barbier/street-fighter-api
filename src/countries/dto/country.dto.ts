import { ApiProperty } from '@nestjs/swagger';

export class CountryDto {
  @ApiProperty({
    description: 'Nom du pays',
    example: 'Japan',
  })
  name: string;

  @ApiProperty({
    description: 'URL du drapeau du pays',
    example: '/assets/countries/Japan.svg',
  })
  flagUrl: string;
}
