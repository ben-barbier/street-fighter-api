import { PartialType } from '@nestjs/swagger';
import { CharacterDto } from './character.dto';

export class UpdateCharacterDto extends PartialType(CharacterDto) {}
