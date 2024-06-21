import { PreferenceAverages } from '../types/gamePreferences.ts'
import { GameDto } from '../types/game.ts'
import { GameCategoryEnum } from '../types/gameEnum.ts'
import { IGameRepository } from '../interfaces/IRepository.ts'
import { IGameService } from '../interfaces/IService.ts'

export default class GameService implements IGameService {
    constructor(private gameRepository: IGameRepository) {}

    public async assembleGameList(
        totalMinutes: number,
        averages: PreferenceAverages
    ): Promise<GameDto[]> {
        let remainingMinutes = totalMinutes
        let failedAttempts = 0
        const games: GameDto[] = []

        while (remainingMinutes > 8 && failedAttempts < 3) {
            const game = await this.gameRepository.fetchGame(
                GameCategoryEnum.STRATEGY,
                [],
                undefined,
                averages.avgDrunk,
                averages.avgActivity,
                remainingMinutes
            )

            if (!game) {
                failedAttempts++
                continue
            }

            games.push(game)

            remainingMinutes -= game.minutes ?? 0
        }

        return games
    }
}
