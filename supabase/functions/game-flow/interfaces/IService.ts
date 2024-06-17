import { PlayerChallenge } from '../types/gameFlow.ts'
import { GamePreferences } from '../types/gamePreferences.ts'

export interface IGameFlowService {
    createGameFlow(preferences: GamePreferences): Promise<Response>
    createPlayerChallenges(playerIds: string[]): Promise<PlayerChallenge[]>
}
