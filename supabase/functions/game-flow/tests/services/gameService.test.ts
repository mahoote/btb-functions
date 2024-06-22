import { assertEquals, assertRejects } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import GameService from '../../services/gameService.ts'
import { ActivityEnum, DrunkEnum, GameCategoryEnum } from '../../types/gameEnum.ts'
import { MockGameRepository } from '../mocks/mockRepository.ts'
import { getAllCategories } from '../../utils/gameUtils.ts'
import sinon from 'npm:sinon'

Deno.test('assembleGameList - should return 1 game per category', async () => {
    const gameRepository = new MockGameRepository()
    const gameService = new GameService(gameRepository)

    const fetchGameSpy = sinon.spy(gameRepository, 'fetchGame')

    const games = await gameService.assembleGameList(30, {
        avgDrunk: DrunkEnum.DRUNK,
        avgActivity: ActivityEnum.MEDIUM,
    })

    const allGameCategoriesSorted = getAllCategories().sort((a, b) => a - b)
    const gameCategoryIds: GameCategoryEnum[] = games.map(game => game.game_category.id)

    assertEquals(gameCategoryIds.length, allGameCategoriesSorted.length)
    assertEquals(gameCategoryIds[0], GameCategoryEnum.SOCIAL_INTERACTIVE)
    assertEquals(
        gameCategoryIds.sort((a, b) => a - b),
        allGameCategoriesSorted
    )
    assertEquals(fetchGameSpy.callCount, 6)
})

Deno.test(
    'assembleGameList - should return 1 game per category with 2 failed attempts',
    async () => {
        const gameRepository = new MockGameRepository(2)
        const gameService = new GameService(gameRepository)

        const fetchGameSpy = sinon.spy(gameRepository, 'fetchGame')

        const games = await gameService.assembleGameList(30, {
            avgDrunk: DrunkEnum.DRUNK,
            avgActivity: ActivityEnum.MEDIUM,
        })

        const allGameCategoriesSorted = getAllCategories().sort((a, b) => a - b)
        const gameCategoryIds: GameCategoryEnum[] = games.map(game => game.game_category.id)

        assertEquals(gameCategoryIds.length, allGameCategoriesSorted.length)
        assertEquals(gameCategoryIds[0], GameCategoryEnum.SOCIAL_INTERACTIVE)
        assertEquals(
            gameCategoryIds.sort((a, b) => a - b),
            allGameCategoriesSorted
        )
        assertEquals(fetchGameSpy.callCount, gameCategoryIds.length + 2)
    }
)

Deno.test('assembleGameList - should fail to assemble games', async () => {
    const gameRepository = new MockGameRepository(3)
    const gameService = new GameService(gameRepository)

    await assertRejects(
        async () => {
            await gameService.assembleGameList(30, {
                avgDrunk: DrunkEnum.DRUNK,
                avgActivity: ActivityEnum.MEDIUM,
            })
        },
        Error,
        'Failed to assemble game list'
    )
})
