import { PreferenceAverages } from '../types/gamePreferences.ts'
import { GameDto } from '../types/game.ts'
import { GameCategoryEnum } from '../types/gameEnum.ts'
import { IGameRepository } from '../interfaces/IRepository.ts'
import { IGameService } from '../interfaces/IService.ts'
import { getAllCategories } from '../utils/gameUtils.ts'

export default class GameService implements IGameService {
    constructor(private gameRepository: IGameRepository) {}

    /**
     * Assembles a list of games based on the total minutes and averages.
     * Will try to use all categories equally.
     * Assembles while the remaining minutes are above 8.
     * @param totalMinutes
     * @param averages
     */
    public async assembleGameList(
        totalMinutes: number,
        averages: PreferenceAverages
    ): Promise<GameDto[]> {
        let remainingMinutes = totalMinutes
        let failedAttempts = 0
        const games: GameDto[] = []

        const gameCategoryUsageCount: Map<GameCategoryEnum, number> = new Map()
        const allGameCategories = getAllCategories()

        while (remainingMinutes > 8 && failedAttempts < 10) {
            let currentGameCategory = GameCategoryEnum.SOCIAL_INTERACTIVE

            if (gameCategoryUsageCount.size > 0 || failedAttempts > 2) {
                const categories = this.getCategories(
                    gameCategoryUsageCount,
                    allGameCategories
                )
                currentGameCategory = categories[Math.floor(Math.random() * categories.length)]
            }

            const game = await this.gameRepository.fetchGame(
                currentGameCategory,
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

            gameCategoryUsageCount.set(
                currentGameCategory,
                (gameCategoryUsageCount.get(currentGameCategory) ?? 0) + 1
            )

            games.push(game)

            remainingMinutes -= game.minutes ?? 0
        }

        if (failedAttempts >= 10) {
            throw new Error('Failed to assemble game list')
        }

        return games
    }

    /**
     * Checks the map of counts for game categories and returns a list of potential categories to use.
     * Will always try to return the categories used the least amount of times.
     * @param gameCategoryUsageCount
     * @param allGameCategories
     * @private
     */
    private getCategories(
        gameCategoryUsageCount: Map<GameCategoryEnum, number>,
        allGameCategories: GameCategoryEnum[]
    ) {
        const categoriesNotInMap = allGameCategories.filter(
            category => !gameCategoryUsageCount.has(category)
        )

        // Make sure all categories are used at least once
        if (categoriesNotInMap.length > 0) {
            return categoriesNotInMap
        }

        const allCategoryCountsEqual =
            [...new Set(gameCategoryUsageCount.values())].length === 1

        if (allCategoryCountsEqual) {
            return allGameCategories
        }

        const lowestUsedCount = Math.min(...gameCategoryUsageCount.values())

        // Return categories with the lowest count
        return [...gameCategoryUsageCount.entries()]
            .filter(([_, count]) => count === lowestUsedCount)
            .map(([category]) => category)
    }
}
