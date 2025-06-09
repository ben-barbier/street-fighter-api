import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class FightDto {
  @ApiProperty({ description: 'Identifiant du premier combattant' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : (value as unknown),
  )
  characterOneId: string;

  @ApiProperty({ description: 'Identifiant du second combattant' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : (value as unknown),
  )
  characterTwoId: string;

  @ApiProperty({ description: 'Identifiant du gagnant du combat' })
  @IsString()
  @IsNotEmpty()
  winnerId: string;

  @ApiProperty({ description: 'Date du combat' })
  @IsDate()
  @IsNotEmpty()
  date: Date;
}
