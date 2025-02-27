import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import { assert, assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'

import { IGameRepository } from '../../interfaces/IRepository.ts'
import GameRepository from '../../repositories/gameRepository.ts'
import {
    AccessoryEnum,
    ActivityEnum,
    DrunkEnum,
    GameCategoryEnum,
} from '../../types/gameEnum.ts'
import { GameDto } from '../../types/game.ts'

Deno.test(
    'fetchGame - should return game with id 2 or 5 when no accessories are provided',
    async () => {
        const repository: IGameRepository = new GameRepository(
            mockClient as unknown as SupabaseClient
        )

        const game = await repository.fetchGame(
            GameCategoryEnum.SOCIAL_INTERACTIVE,
            [],
            undefined,
            DrunkEnum.DRUNK,
            ActivityEnum.MEDIUM,
            30
        )

        assert(game.id === 2 || game.id === 5, `game.id should be 2 or 5, but got ${game.id}`)
    }
)

/**
 * This test runs 20 times to make sure all the games are returned at some point.
 */
Deno.test('fetchGame - should return a game with accessories', async () => {
    const repository: IGameRepository = new GameRepository(
        mockClient as unknown as SupabaseClient
    )

    const games: GameDto[] = []

    for (let i = 0; i < 20; i++) {
        const game = await repository.fetchGame(
            GameCategoryEnum.SOCIAL_INTERACTIVE,
            [AccessoryEnum.PEN],
            undefined,
            DrunkEnum.DRUNK,
            ActivityEnum.MEDIUM,
            30
        )
        games.push(game)
    }

    const expectedGameIds = [2, 3, 5]

    for (const expectedGameId of expectedGameIds) {
        assertEquals(
            games.map(game => game.id).includes(expectedGameId),
            true,
            `Game with id ${expectedGameId} not found`
        )
    }
})

Deno.test('fetchGame - should return a game with multiple accessories', async () => {
    const repository: IGameRepository = new GameRepository(
        mockClient as unknown as SupabaseClient
    )

    const games: GameDto[] = []

    for (let i = 0; i < 20; i++) {
        const game = await repository.fetchGame(
            GameCategoryEnum.SOCIAL_INTERACTIVE,
            [AccessoryEnum.PEN, AccessoryEnum.PAPER],
            undefined,
            DrunkEnum.DRUNK,
            ActivityEnum.MEDIUM,
            30
        )
        games.push(game)
    }

    const expectedGameIds = [2, 3, 4, 5, 6]

    for (const expectedGameId of expectedGameIds) {
        assertEquals(
            games.map(game => game.id).includes(expectedGameId),
            true,
            `Game with id ${expectedGameId} not found`
        )
    }
})

const mockClient = {
    from: () => ({
        select: () => ({
            eq: () => ({
                is: () => ({
                    eq: () => ({
                        eq: () => ({
                            lte: () => ({
                                data: createGames(),
                                error: null,
                            }),
                        }),
                    }),
                }),
            }),
        }),
    }),
}

function createGames() {
    return [
        {
            id: 1,
            created_at: '2024-06-01T12:00:00Z',
            min_players: 3,
            activity_level: ActivityEnum.MEDIUM,
            drunk_level: DrunkEnum.DRUNK,
            minutes: 3,
            game_type_id: 1,
            descriptions: ['This is a test game.'],
            intro_description: 'Coolest test game ever!',
            name: 'Test 1',
            game_category: {
                id: GameCategoryEnum.SOCIAL_INTERACTIVE.valueOf(),
                name: GameCategoryEnum.SOCIAL_INTERACTIVE.toString(),
            },
            accessories: [{ id: AccessoryEnum.BLINDFOLD }],
        },
        {
            id: 2,
            created_at: '2024-06-01T12:00:00Z',
            min_players: 3,
            activity_level: ActivityEnum.MEDIUM,
            drunk_level: DrunkEnum.DRUNK,
            minutes: 3,
            game_type_id: 1,
            descriptions: ['This is a test game.'],
            intro_description: 'Coolest test game ever!',
            name: 'Test 2',
            game_category: {
                id: GameCategoryEnum.SOCIAL_INTERACTIVE.valueOf(),
                name: GameCategoryEnum.SOCIAL_INTERACTIVE.toString(),
            },
            accessories: [],
        },
        {
            id: 3,
            created_at: '2024-06-01T12:00:00Z',
            min_players: 3,
            activity_level: ActivityEnum.MEDIUM,
            drunk_level: DrunkEnum.DRUNK,
            minutes: 3,
            game_type_id: 1,
            descriptions: ['This is a test game.'],
            intro_description: 'Coolest test game ever!',
            name: 'Test 3',
            game_category: {
                id: GameCategoryEnum.SOCIAL_INTERACTIVE.valueOf(),
                name: GameCategoryEnum.SOCIAL_INTERACTIVE.toString(),
            },
            accessories: [{ id: AccessoryEnum.PEN }],
        },
        {
            id: 4,
            created_at: '2024-06-01T12:00:00Z',
            min_players: 3,
            activity_level: ActivityEnum.MEDIUM,
            drunk_level: DrunkEnum.DRUNK,
            minutes: 3,
            game_type_id: 1,
            descriptions: ['This is a test game.'],
            intro_description: 'Coolest test game ever!',
            name: 'Test 4',
            game_category: {
                id: GameCategoryEnum.SOCIAL_INTERACTIVE.valueOf(),
                name: GameCategoryEnum.SOCIAL_INTERACTIVE.toString(),
            },
            accessories: [{ id: AccessoryEnum.PEN }, { id: AccessoryEnum.PAPER }],
        },
        {
            id: 5,
            created_at: '2024-06-01T12:00:00Z',
            min_players: 3,
            activity_level: ActivityEnum.MEDIUM,
            drunk_level: DrunkEnum.DRUNK,
            minutes: 3,
            game_type_id: 1,
            descriptions: ['This is a test game.'],
            intro_description: 'Coolest test game ever!',
            name: 'Test 5',
            game_category: {
                id: GameCategoryEnum.SOCIAL_INTERACTIVE.valueOf(),
                name: GameCategoryEnum.SOCIAL_INTERACTIVE.toString(),
            },
            accessories: [],
        },
        {
            id: 6,
            created_at: '2024-06-01T12:00:00Z',
            min_players: 3,
            activity_level: ActivityEnum.MEDIUM,
            drunk_level: DrunkEnum.DRUNK,
            minutes: 3,
            game_type_id: 1,
            descriptions: ['This is a test game.'],
            intro_description: 'Coolest test game ever!',
            name: 'Test 6',
            game_category: {
                id: GameCategoryEnum.SOCIAL_INTERACTIVE.valueOf(),
                name: GameCategoryEnum.SOCIAL_INTERACTIVE.toString(),
            },
            accessories: [{ id: AccessoryEnum.PEN }, { id: AccessoryEnum.PAPER }],
        },
    ]
}
