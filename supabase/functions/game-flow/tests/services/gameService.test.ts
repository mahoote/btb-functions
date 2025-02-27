import {
    assertEquals,
    assertGreaterOrEqual,
    assertLess,
    assertRejects,
} from 'https://deno.land/std@0.224.0/assert/mod.ts'
import sinon from 'npm:sinon'

import GameService from '../../services/gameService.ts'
import { ActivityEnum, DrunkEnum, GameCategoryEnum } from '../../types/gameEnum.ts'
import { MockGameRepository } from '../mocks/mockRepository.ts'
import { getAllCategories } from '../../utils/gameUtils.ts'

Deno.test('assembleGameList - should return 1 game per category', async () => {
    const gameRepository = new MockGameRepository()
    const gameService = new GameService(gameRepository)

    const fetchGameSpy = sinon.spy(gameRepository, 'fetchGame')

    const games = await gameService.assembleGameList(
        30,
        {
            avgDrunk: DrunkEnum.DRUNK,
            avgActivity: ActivityEnum.MEDIUM,
        },
        []
    )

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

        const games = await gameService.assembleGameList(
            30,
            {
                avgDrunk: DrunkEnum.DRUNK,
                avgActivity: ActivityEnum.MEDIUM,
            },
            []
        )

        const allGameCategoriesSorted = getAllCategories().sort((a, b) => a - b)
        const gameCategoryIds: GameCategoryEnum[] = games.map(game => game.game_category.id)

        assertEquals(gameCategoryIds.length, allGameCategoriesSorted.length)
        assertEquals(
            gameCategoryIds.sort((a, b) => a - b),
            allGameCategoriesSorted
        )
        assertEquals(fetchGameSpy.callCount, gameCategoryIds.length + 2)
    }
)

Deno.test('assembleGameList - should return 3 games per category', async () => {
    const gameRepository = new MockGameRepository()
    const gameService = new GameService(gameRepository)

    const fetchGameSpy = sinon.spy(gameRepository, 'fetchGame')

    const games = await gameService.assembleGameList(
        80,
        {
            avgDrunk: DrunkEnum.DRUNK,
            avgActivity: ActivityEnum.MEDIUM,
        },
        []
    )

    const gameCategoryIds: GameCategoryEnum[] = games.map(game => game.game_category.id)
    const categoryOccurrenceCountMap = new Map<number, number>()

    gameCategoryIds.forEach(num => {
        if (categoryOccurrenceCountMap.has(num)) {
            categoryOccurrenceCountMap.set(num, categoryOccurrenceCountMap.get(num)! + 1)
        } else {
            categoryOccurrenceCountMap.set(num, 1)
        }
    })

    for (const [num, count] of categoryOccurrenceCountMap.entries()) {
        assertEquals(count, 3, `Number ${num} does not appear 3 times`)
    }

    assertEquals(gameCategoryIds.length, 18)
    assertEquals(fetchGameSpy.callCount, 18)
})

Deno.test('assembleGameList - should fail to assemble games', async () => {
    const gameRepository = new MockGameRepository(3)
    const gameService = new GameService(gameRepository)

    await assertRejects(
        async () => {
            await gameService.assembleGameList(
                30,
                {
                    avgDrunk: DrunkEnum.DRUNK,
                    avgActivity: ActivityEnum.MEDIUM,
                },
                []
            )
        },
        Error,
        'Failed to assemble game list.'
    )
})

Deno.test(
    'assembleGameList - should have sum minutes in between totalMinutes - 8 and totalMinutes - 4',
    async () => {
        const gameRepository = new MockGameRepository()
        const gameService = new GameService(gameRepository)

        const totalMinutes = 30

        const games = await gameService.assembleGameList(
            totalMinutes,
            {
                avgDrunk: DrunkEnum.DRUNK,
                avgActivity: ActivityEnum.MEDIUM,
            },
            []
        )

        const sumMinutes = games.reduce((acc, game) => acc + game?.minutes, 0)

        assertGreaterOrEqual(sumMinutes, totalMinutes - 8)
        assertLess(sumMinutes, totalMinutes - 4)
    }
)
