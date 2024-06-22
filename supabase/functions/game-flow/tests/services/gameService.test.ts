import { assertEquals } from 'https://deno.land/std@0.224.0/assert/assert_equals.ts'
import GameService from '../../services/gameService.ts'
import { ActivityEnum, DrunkEnum, GameCategoryEnum } from '../../types/gameEnum.ts'
import { MockGameRepository } from '../mocks/mockRepository.ts'
import { getAllCategories } from '../../utils/gameUtils.ts'

Deno.test('assembleGameList - should return 1 game per category', async () => {
    const gameRepository = new MockGameRepository()
    const gameService = new GameService(gameRepository)

    const games = await gameService.assembleGameList(30, {
        avgDrunk: DrunkEnum.DRUNK,
        avgActivity: ActivityEnum.HIGH,
    })

    const allGameCategoriesSorted = getAllCategories().sort((a, b) => a - b)
    const gameCategoryIds: GameCategoryEnum[] = games.map(game => game.game_category.id)

    assertEquals(gameCategoryIds.length, allGameCategoriesSorted.length)
    assertEquals(gameCategoryIds[0], GameCategoryEnum.SOCIAL_INTERACTIVE)
    assertEquals(
        gameCategoryIds.sort((a, b) => a - b),
        allGameCategoriesSorted
    )
})
