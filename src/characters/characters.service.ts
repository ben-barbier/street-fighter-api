import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { characters } from './characters.data';

@Injectable()
export class CharactersService {
  private characters: Character[] = characters();

  public create(createCharacterDto: CreateCharacterDto): void {
    this.characters = this.characters.concat(createCharacterDto);
  }

  public findAll() {
    return this.characters;
  }

  public findOne(id: string) {
    return this.characters.find((character) => character.id === id);
  }

  public update(id: string, updateCharacterDto: UpdateCharacterDto): void {
    this.characters = this.characters.map((character) => {
      if (character.id === updateCharacterDto.id) {
        return { ...character, ...updateCharacterDto };
      }
      return character;
    });
  }

  public remove(id: string): void {
    this.characters = this.characters.filter(
      (character) => character.id !== id,
    );
  }
}
