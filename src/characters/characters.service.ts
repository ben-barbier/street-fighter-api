import { Injectable } from '@nestjs/common';
import { characters } from './characters.data';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { DuplicateCharacterIdException } from './exceptions/duplicate-character-id.exception';

@Injectable()
export class CharactersService {
  private characters: Character[] = characters();

  public create(createCharacterDto: CreateCharacterDto): void {
    // Génération de l'ID en kebab-case à partir du nom du personnage
    const id = createCharacterDto.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

    // Vérification de l'existence de l'ID
    if (this.characters.some((character) => character.id === id)) {
      throw new DuplicateCharacterIdException(id);
    }

    // Ajout du personnage avec l'ID généré
    this.characters = this.characters.concat({
      id,
      ...createCharacterDto,
    });
  }

  public findAll(): Character[] {
    return this.characters;
  }

  public findOne(id: string): Character | undefined {
    return this.characters.find((character) => character.id === id);
  }

  public update(id: string, updateCharacterDto: UpdateCharacterDto): void {
    this.characters = this.characters.map((character) => {
      if (character.id === id) {
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

  public fight(character: Character, versus: Character): Character {
    return Math.random() * 100 < 50 ? character : versus;
  }
}
