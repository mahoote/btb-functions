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

        const gameCategoryUsageCount: Map<GameCategoryEnum, number> = new Map()
        const allGameCategories: GameCategoryEnum[] = [
            GameCategoryEnum.QUICK_THINKING,
            GameCategoryEnum.SKILLS,
            GameCategoryEnum.SOCIAL_INTERACTIVE,
            GameCategoryEnum.STRATEGY,
            GameCategoryEnum.TEAMS,
            GameCategoryEnum.TRIVIA_AND_KNOWLEDGE,
        ]

        while (remainingMinutes > 8 && failedAttempts < 3) {
            let currentGameCategory = GameCategoryEnum.SOCIAL_INTERACTIVE

            if (gameCategoryUsageCount.size > 0) {
                const categories = this.getCategories(
                    gameCategoryUsageCount,
                    allGameCategories
                )
                currentGameCategory = categories[Math.floor(Math.random() * categories.length)]

                gameCategoryUsageCount.set(
                    currentGameCategory,
                    (gameCategoryUsageCount.get(currentGameCategory) ?? 0) + 1
                )
            } else {
                gameCategoryUsageCount.set(
                    currentGameCategory,
                    (gameCategoryUsageCount.get(currentGameCategory) ?? 0) + 1
                )
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

            games.push(game)

            remainingMinutes -= game.minutes ?? 0
        }

        return games
    }

    private getCategories(
        gameCategoryUsageCount: Map<GameCategoryEnum, number>,
        allGameCategories: GameCategoryEnum[]
    ) {
        // Step 1: Find categories not in the map
        const categoriesNotInMap = allGameCategories.filter(
            category => !gameCategoryUsageCount.has(category)
        )

        if (categoriesNotInMap.length > 0) {
            // Return categories not in map
            return categoriesNotInMap
        }

        // Step 2: Find categories with the lowest count
        const minCount = Math.min(...gameCategoryUsageCount.values())
        const categoriesWithMinCount = [...gameCategoryUsageCount.entries()]
            .filter(([category, count]) => count === minCount)
            .map(([category]) => category)

        // Step 3: Check if all counts are equal
        const allCountsEqual = [...new Set(gameCategoryUsageCount.values())].length === 1

        if (allCountsEqual) {
            // Return full list of categories
            return allGameCategories
        }

        // Return categories with the lowest count
        return categoriesWithMinCount
    }
}
