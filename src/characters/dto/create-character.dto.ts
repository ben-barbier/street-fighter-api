import { OmitType } from '@nestjs/swagger';
import { CharacterDto } from './character.dto';

export class CreateCharacterDto extends OmitType(CharacterDto, ['id']) {}
