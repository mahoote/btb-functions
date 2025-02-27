import ChallengeRepository from './repositories/challengeRepository.ts'
import GameFlowService from './services/gameFlowService.ts'
import { createSupabaseClient } from '../_shared/supabaseClient.ts'
import GameRepository from './repositories/gameRepository.ts'
import GameService from './services/gameService.ts'
import ChallengeService from './services/challengeService.ts'

class DIContainer {
    private static gameFlowService: GameFlowService

    public static getGameFlowService(): GameFlowService {
        if (!this.gameFlowService) {
            const supabase = createSupabaseClient('game')
            // Repositories
            const challengeRepository = new ChallengeRepository(supabase)
            const gameRepository = new GameRepository(supabase)

            // Services
            const challengeService = new ChallengeService(challengeRepository)
            const gameService = new GameService(gameRepository)

            DIContainer.gameFlowService = new GameFlowService(challengeService, gameService)
        }
        return DIContainer.gameFlowService
    }
}

export default DIContainer
