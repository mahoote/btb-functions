import { PlayerChallenge } from '../types/gameFlow.ts'
import { GamePreferences, PreferenceAverages } from '../types/gamePreferences.ts'
import { GameDto } from '../types/game.ts'
import { AccessoryEnum } from '../types/gameEnum.ts'

export interface IGameFlowService {
    createGameFlow(preferences: GamePreferences): Promise<Response>
}

export interface IGameService {
    assembleGameList(
        totalMinutes: number,
        averages: PreferenceAverages,
        accessories: AccessoryEnum[]
    ): Promise<GameDto[]>
}

export interface IChallengeService {
    assemblePlayerChallengeList(playerIds: string[]): Promise<PlayerChallenge[]>
}
