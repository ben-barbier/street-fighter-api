import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class FightDto {
  @ApiProperty({ description: 'Identifiant du premier combattant', example: 'ryu' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : (value as unknown)))
  @IsString()
  @IsNotEmpty()
  characterOneId: string;

  @ApiProperty({ description: 'Identifiant du second combattant', example: 'ken' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : (value as unknown)))
  @IsString()
  @IsNotEmpty()
  characterTwoId: string;

  @ApiProperty({ description: 'Identifiant du gagnant du combat', example: 'ryu' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : (value as unknown)))
  @IsString()
  @IsNotEmpty()
  winnerId: string;

  @ApiProperty({ description: 'Date du combat', example: '2023-10-01T12:00:00Z' })
  @IsDate()
  @IsNotEmpty()
  date: Date;
}
