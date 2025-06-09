import { ApiProperty } from '@nestjs/swagger';

export class CharacterDto {
  @ApiProperty({
    description: 'Identifiant unique du personnage',
    example: 'ryu',
  })
  id: string;

  @ApiProperty({
    description: "Ordre d'affichage du personnage",
    example: 1,
  })
  order: number;

  @ApiProperty({
    description: 'Nom du personnage',
    example: 'Ryu',
  })
  name: string;

  @ApiProperty({
    description: 'Points de stamina du personnage',
    example: 1000,
  })
  stamina: number;

  @ApiProperty({
    description: 'Points de stun du personnage',
    example: 1000,
  })
  stun: number;

  @ApiProperty({
    description: "Pays d'origine du personnage",
    example: 'Japan',
  })
  country: string;
}
