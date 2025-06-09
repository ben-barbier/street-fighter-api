import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class FightDto {
  @ApiProperty({
    description: 'Identifiant du premier combattant',
    example: 'ryu',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : (value as unknown),
  )
  characterOneId: string;

  @ApiProperty({
    description: 'Identifiant du second combattant',
    example: 'ken',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : (value as unknown),
  )
  characterTwoId: string;

  @ApiProperty({
    description: 'Identifiant du gagnant du combat',
    example: 'ryu',
  })
  @IsString()
  @IsNotEmpty()
  winnerId: string;

  @ApiProperty({
    description: 'Date du combat',
    example: '2023-10-01T12:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;
}
