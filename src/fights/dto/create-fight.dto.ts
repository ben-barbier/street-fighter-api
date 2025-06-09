import { PickType } from '@nestjs/swagger';
import { FightDto } from './fight.dto';

export class CreateFightDto extends PickType(FightDto, [
  'characterOneId',
  'characterTwoId',
]) {}
