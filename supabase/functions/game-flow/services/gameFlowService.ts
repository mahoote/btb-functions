import { createResponse } from '../../_shared/response.ts'
import { GamePreferences, PreferenceAverages } from '../types/gamePreferences.ts'
import calculateAverages from '../utils/calculateAverages.ts'
import { filterPlayerIdsWithChallenge } from '../utils/challengeUtils.ts'
import GameFlow, { PlayerChallenge } from '../types/gameFlow.ts'
import { IGameFlowService } from '../interfaces/IService.ts'
import { IChallengeRepository, IGameRepository } from '../interfaces/IRepository.ts'
import { GameCategoryEnum } from '../types/gameEnum.ts'
import { Challenge } from '../types/challenge.ts'
import { GameDto } from '../types/game.ts'

export default class GameFlowService implements IGameFlowService {
    constructor(
        private challengeRepository: IChallengeRepository,
        private gameRepository: IGameRepository
    ) {}

    public async createGameFlow(preferences: GamePreferences): Promise<Response> {
        const gameFlow: GameFlow = {
            isPlayerCreative: preferences.isPlayerCreative,
            games: [],
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

        gameFlow.games = await this.createGames(preferences.gameMinutes, averages)

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

    public async createGames(
        totalMinutes: number,
        averages: PreferenceAverages
    ): Promise<GameDto[]> {
        let remainingMinutes = totalMinutes
        let failedAttempts = 0
        const games: GameDto[] = []

        while (remainingMinutes > 3 && failedAttempts < 3) {
            const game = await this.gameRepository.fetchGame(
                GameCategoryEnum.QUICK_THINKING,
                [],
                undefined,
                averages.avgDrunk,
                averages.avgActivity
            )

            if (!game) {
                failedAttempts++
                continue
            }

            if (game.minutes && game.minutes > remainingMinutes) {
                continue
            }

            games.push(game)

            remainingMinutes -= game.minutes ?? 0
        }

        return games
    }
}
