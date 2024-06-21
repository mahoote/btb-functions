import { PlayerChallenge } from '../types/gameFlow.ts'
import { GamePreferences, PreferenceAverages } from '../types/gamePreferences.ts'
import { GameDto } from '../types/game.ts'

export interface IGameFlowService {
    createGameFlow(preferences: GamePreferences): Promise<Response>
}

export interface IGameService {
    assembleGameList(totalMinutes: number, averages: PreferenceAverages): Promise<GameDto[]>
}

export interface IChallengeService {
    assemblePlayerChallengeList(playerIds: string[]): Promise<PlayerChallenge[]>
}
