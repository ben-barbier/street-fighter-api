import { Injectable } from '@nestjs/common';
import { Fight } from './entities/fight.entity';

@Injectable()
export class FightsService {
  private fights: Fight[] = [];

  create(characterOneId: string, characterTwoId: string): Fight {
    const newFight = {
      characterOneId,
      characterTwoId,
      winnerId: this.determineWinner(characterOneId, characterTwoId),
      date: new Date(),
    };

    this.fights.push(newFight);
    return newFight;
  }

  findAll(): Fight[] {
    return this.fights;
  }

  findByCharacterId(characterId: string): Fight[] {
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
