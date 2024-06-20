import ChallengeRepository from './repositories/challengeRepository.ts'
import GameFlowService from './services/gameFlowService.ts'
import { supabaseClient } from '../_shared/supabaseClient.ts'
import GameRepository from './repositories/gameRepository.ts'

class DIContainer {
    private static gameFlowService: GameFlowService

    public static getGameFlowService(): GameFlowService {
        if (!this.gameFlowService) {
            const challengeRepository = new ChallengeRepository(supabaseClient)
            const gameRepository = new GameRepository(supabaseClient)
            DIContainer.gameFlowService = new GameFlowService(
                challengeRepository,
                gameRepository
            )
        }
        return DIContainer.gameFlowService
    }
}

export default DIContainer
