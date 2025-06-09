import { Injectable } from '@nestjs/common';
import { CharactersService } from '../characters/characters.service';
import { Fight } from './entities/fight.entity';
import { CharacterNotFoundException } from './exceptions/character-not-found.exception';
import { MultipleCharactersNotFoundException } from './exceptions/multiple-characters-not-found.exception';
import { SameCharacterFightException } from './exceptions/same-character-fight.exception';

@Injectable()
export class FightsService {
  private fights: Fight[] = [];

  constructor(private readonly charactersService: CharactersService) {}

  private verifyDifferentCharacters(
    characterOneId: string,
    characterTwoId: string,
  ): void {
    if (characterOneId === characterTwoId) {
      throw new SameCharacterFightException(characterOneId);
    }
  }

  private verifyCharactersExist(
    characterOneId: string,
    characterTwoId: string,
  ): void {
    const characterOne = this.charactersService.findOne(characterOneId);
    const characterTwo = this.charactersService.findOne(characterTwoId);

    if (!characterOne && !characterTwo) {
      throw new MultipleCharactersNotFoundException([
        characterOneId,
        characterTwoId,
      ]);
    } else if (!characterOne) {
      throw new CharacterNotFoundException(characterOneId);
    } else if (!characterTwo) {
      throw new CharacterNotFoundException(characterTwoId);
    }
  }

  create(characterOneId: string, characterTwoId: string): Fight {
    this.verifyCharactersExist(characterOneId, characterTwoId);
    this.verifyDifferentCharacters(characterOneId, characterTwoId);

    const newFight: Fight = {
      characterOneId,
      characterTwoId,
      winnerId: this.determineWinner(characterOneId, characterTwoId),
      date: new Date(),
    };

    this.fights = this.fights.concat(newFight);
    return newFight;
  }

  findAll(): Fight[] {
    return this.fights;
  }

  findByCharacterId(characterId: string): Fight[] {
    const character = this.charactersService.findOne(characterId);
    if (!character) {
      throw new CharacterNotFoundException(characterId);
    }

    return this.fights.filter(
      (fight) =>
        fight.characterOneId === characterId ||
        fight.characterTwoId === characterId,
    );
  }

  private determineWinner(
    characterOneId: string,
    characterTwoId: string,
  ): string {
    return Math.random() * 100 < 50 ? characterOneId : characterTwoId;
  }
}
