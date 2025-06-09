import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FightsService } from '../fights/fights.service';
import { characters } from './characters.data';
import { CharacterDto } from './dto/character.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { CharacterHasFightsException } from './exceptions/character-has-fights.exception';
import { CharacterNotFoundException } from './exceptions/character-not-found.exception';
import { DuplicateCharacterIdException } from './exceptions/duplicate-character-id.exception';

@Injectable()
export class CharactersService {
  private characters: Character[] = characters();

  constructor(
    @Inject(forwardRef(() => FightsService))
    private readonly fightsService: FightsService
  ) {}

  private generateId(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }

  private validateId(id: string, excludeId?: string): void {
    if (this.characters.some(char => char.id === id && char.id !== excludeId)) {
      throw new DuplicateCharacterIdException(id);
    }
  }

  public create(createCharacterDto: CreateCharacterDto): CharacterDto {
    // Génération de l'ID en kebab-case à partir du nom du personnage
    const id = this.generateId(createCharacterDto.name);

    // Vérification de l'existence de l'ID
    this.validateId(id);

    const newCharacter: Character = { id, ...createCharacterDto };

    // Décaler les personnages ayant un ordre supérieur ou égal à celui du nouveau personnage
    this.characters = this.characters.map(character => {
      if (character.order >= createCharacterDto.order) {
        return { ...character, order: character.order + 1 };
      }
      return character;
    });

    // Ajout du personnage avec l'ID généré
    this.characters = this.characters.concat(newCharacter);

    return newCharacter;
  }

  public findAll(): Character[] {
    return this.characters.toSorted((c1, c2) => c1.order - c2.order);
  }

  public findOne(id: string): Character | undefined {
    return this.characters.find(character => character.id === id);
  }

  public update(id: string, updateCharacterDto: UpdateCharacterDto): CharacterDto {
    const character = this.findOne(id);
    if (!character) {
      throw new CharacterNotFoundException(id);
    }

    // Si le nom est modifié, vérifier si cela générerait un ID déjà existant
    if (updateCharacterDto.name && updateCharacterDto.name !== character.name) {
      // Utilisation de la méthode factorisée pour vérifier le nouvel ID potentiel
      this.validateId(this.generateId(updateCharacterDto.name), id);
    }

    const updatedCharacter = { ...character, ...updateCharacterDto };

    this.characters = this.characters.map(character => {
      return character.id === id ? updatedCharacter : character;
    });

    return updatedCharacter;
  }

  public remove(id: string): void {
    const character = this.findOne(id);
    if (!character) {
      throw new CharacterNotFoundException(id);
    }

    // Vérifier si le personnage a des combats associés avant de le supprimer
    if (this.fightsService.isCharacterUsedInFights(id)) {
      throw new CharacterHasFightsException(id);
    }

    this.characters = this.characters.filter(character => character.id !== id);
  }
}
