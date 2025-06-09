import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class FightDto {
  @ApiProperty({ description: 'Identifiant du premier combattant' })
  @IsString()
  characterOneId: string;

  @ApiProperty({ description: 'Identifiant du second combattant' })
  @IsString()
  characterTwoId: string;

  @ApiProperty({ description: 'Identifiant du gagnant du combat' })
  @IsString()
  winnerId: string;

  @ApiProperty({ description: 'Date du combat' })
  @IsDate()
  date: Date;
}
