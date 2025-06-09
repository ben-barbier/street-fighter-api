import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CharacterDto {
  @ApiProperty({ description: 'Identifiant unique du personnage', example: 'ryu' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : (value as unknown)))
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "Ordre d'affichage du personnage", example: 1 })
  @IsInt()
  @Min(1)
  order: number;

  @ApiProperty({ description: 'Nom du personnage', example: 'Ryu' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : (value as unknown)))
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Points de stamina du personnage', example: 1000 })
  @IsInt()
  @Min(1)
  stamina: number;

  @ApiProperty({ description: 'Points de stun du personnage', example: 1000 })
  @IsInt()
  @Min(1)
  stun: number;

  @ApiProperty({ description: "Pays d'origine du personnage", example: 'Japan' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : (value as unknown)))
  @IsString()
  @IsNotEmpty()
  country: string;
}
