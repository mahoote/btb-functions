import { createResponse } from '../../_shared/response.ts'
import { GamePreferences } from '../types/gamePreferences.ts'
import calculateAverages from '../utils/calculateAverages.ts'
import { filterPlayerIdsWithChallenge } from '../utils/challengeUtils.ts'
import GameFlow, { PlayerChallenge } from '../types/gameFlow.ts'
import { IGameFlowService } from '../interfaces/IService.ts'
import { IChallengeRepository, IGameRepository } from '../interfaces/IRepository.ts'
import { GameCategoryEnum } from '../types/gameEnum.ts'
import { Challenge } from '../types/challenge.ts'

export default class GameFlowService implements IGameFlowService {
    constructor(
        private challengeRepository: IChallengeRepository,
        private gameRepository: IGameRepository
    ) {}

    public async createGameFlow(preferences: GamePreferences): Promise<Response> {
        const gameFlow: GameFlow = {
            isPlayerCreative: preferences.isPlayerCreative,
        }

        const averages = calculateAverages(preferences.playerPreferences)

        const playerIdsWithChallenge = filterPlayerIdsWithChallenge(
            averages,
            preferences.playerPreferences
        )

        if (playerIdsWithChallenge.length > 0 && !preferences.isPlayerCreative) {
            gameFlow.playerChallenges =
                await this.createPlayerChallenges(playerIdsWithChallenge)
        }

        // TODO: Fetch games from db. Add a logic for finding games with correct criteria.

        // TODO: Add other stuff like betting and push your luck.

        return createResponse(JSON.stringify(gameFlow), 201)
    }

    public async createPlayerChallenges(playerIds: string[]): Promise<PlayerChallenge[]> {
        return await Promise.all(
            playerIds.map(async (playerId): Promise<PlayerChallenge> => {
                const challenge: Challenge =
                    await this.challengeRepository.fetchRandomChallenge()
                return {
                    playerId,
                    challenge: challenge.message,
                }
            })
        )
    }
}
