import { Challenge } from '../types/challenge.ts'
import { GameDto } from '../types/game.ts'
import {
    AccessoryEnum,
    ActivityEnum,
    DrunkEnum,
    GameAudienceEnum,
    GameCategoryEnum,
} from '../types/gameEnum.ts'

export interface IChallengeRepository {
    fetchRandomChallenge(): Promise<Challenge>
}

export interface IGameRepository {
    fetchGame(
        category: GameCategoryEnum,
        accessories: AccessoryEnum[],
        audience?: GameAudienceEnum,
        drunkLevel?: DrunkEnum,
        activityLevel?: ActivityEnum,
        maxMinutes?: number
    ): Promise<GameDto>
}
