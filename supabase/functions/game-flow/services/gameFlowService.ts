import { createResponse } from '../../_shared/response.ts'
import { GamePreferences } from '../types/gamePreferences.ts'
import calculateAverages from '../utils/calculateAverages.ts'
import { filterPlayerIdsWithChallenge } from '../utils/challengeUtils.ts'
import GameFlow from '../types/gameFlow.ts'
import { IChallengeService, IGameFlowService, IGameService } from '../interfaces/IService.ts'

export default class GameFlowService implements IGameFlowService {
    constructor(
        private challengeService: IChallengeService,
        private gameService: IGameService
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
                await this.challengeService.assemblePlayerChallengeList(playerIdsWithChallenge)
        }

        gameFlow.games = await this.gameService.assembleGameList(
            preferences.gameMinutes,
            averages,
            preferences.accessories
        )

        // TODO: Add other stuff like betting and push your luck.

        return createResponse(JSON.stringify(gameFlow), 201)
    }
}
