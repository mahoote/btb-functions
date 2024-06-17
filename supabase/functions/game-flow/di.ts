import ChallengeRepository from './repositories/challengeRepository.ts'
import GameFlowService from './services/gameFlowService.ts'

class DIContainer {
    private static gameFlowService: GameFlowService

    public static getGameFlowService(): GameFlowService {
        if (!this.gameFlowService) {
            const challengeRepository = new ChallengeRepository()
            DIContainer.gameFlowService = new GameFlowService(challengeRepository)
        }
        return DIContainer.gameFlowService
    }
}

export default DIContainer
