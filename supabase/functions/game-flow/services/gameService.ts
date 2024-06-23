import { PreferenceAverages } from '../types/gamePreferences.ts'
import { GameDto } from '../types/game.ts'
import { AccessoryEnum, GameCategoryEnum } from '../types/gameEnum.ts'
import { IGameRepository } from '../interfaces/IRepository.ts'
import { IGameService } from '../interfaces/IService.ts'
import { getAllCategories, getAveragesWithChanceForMargin } from '../utils/gameUtils.ts'

export default class GameService implements IGameService {
    constructor(private gameRepository: IGameRepository) {}

    /**
     * Assembles a list of games based on the total minutes and averages.
     * Will try to use all categories equally.
     * Assembles while the remaining minutes are above 8.
     * @param totalMinutes
     * @param averages
     * @param accessories
     */
    public async assembleGameList(
        totalMinutes: number,
        averages: PreferenceAverages,
        accessories: AccessoryEnum[]
    ): Promise<GameDto[]> {
        let remainingMinutes = totalMinutes
        let failedAttempts = 0
        const maxRetries = 10

        const games: GameDto[] = []
        const gameCategoryUsageCount: Map<GameCategoryEnum, number> = new Map()
        const allGameCategories = getAllCategories()

        while (remainingMinutes > 8 && failedAttempts < maxRetries) {
            let currentGameCategory = GameCategoryEnum.SOCIAL_INTERACTIVE

            if (gameCategoryUsageCount.size > 0 || failedAttempts > 2) {
                const categories = this.getCategories(
                    gameCategoryUsageCount,
                    allGameCategories
                )
                currentGameCategory = categories[Math.floor(Math.random() * categories.length)]
            }

            const [avgDrunk, avgActivity] = getAveragesWithChanceForMargin(averages)

            const newGame = await this.gameRepository.fetchGame(
                currentGameCategory,
                accessories,
                undefined,
                avgDrunk,
                avgActivity,
                remainingMinutes
            )

            if (!newGame) {
                failedAttempts++
                continue
            }

            const gameExistsInFlow = games.some(game => game.id === newGame.id)

            if (gameExistsInFlow) {
                failedAttempts++
                continue
            }

            games.push(newGame)

            gameCategoryUsageCount.set(
                currentGameCategory,
                (gameCategoryUsageCount.get(currentGameCategory) ?? 0) + 1
            )

            remainingMinutes -= newGame.minutes ?? 0
        }

        if (failedAttempts >= maxRetries) {
            throw new Error(
                `Failed to assemble game list. Averages: ${JSON.stringify(averages)}`
            )
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
