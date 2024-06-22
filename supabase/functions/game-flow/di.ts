import ChallengeRepository from './repositories/challengeRepository.ts'
import GameFlowService from './services/gameFlowService.ts'
import { supabaseClient } from '../_shared/supabaseClient.ts'
import GameRepository from './repositories/gameRepository.ts'
import GameService from './services/gameService.ts'
import ChallengeService from './services/challengeService.ts'

class DIContainer {
    private static gameFlowService: GameFlowService

    public static getGameFlowService(): GameFlowService {
        if (!this.gameFlowService) {
            // Repositories
            const challengeRepository = new ChallengeRepository(supabaseClient)
            const gameRepository = new GameRepository(supabaseClient)

            // Services
            const challengeService = new ChallengeService(challengeRepository)
            const gameService = new GameService(gameRepository)

            DIContainer.gameFlowService = new GameFlowService(challengeService, gameService)
        }
        return DIContainer.gameFlowService
    }
}

export default DIContainer
