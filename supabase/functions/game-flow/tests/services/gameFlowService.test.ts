import { ActivityEnum, DrunkEnum } from '../../types/gameEnum.ts'
import { GamePreferences, PlayerPreference } from '../../types/gamePreferences.ts'
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/assert_equals.ts'
import GameFlowService from '../../services/gameFlowService.ts'
import { PlayerChallenge } from '../../types/gameFlow.ts'
import { createMockGame, MockChallengeService, MockGameService } from '../mocks/mockService.ts'
import { Player } from '../../../_shared/types/player.ts'

Deno.test('gameFlowService - should create a basic flow with a simple outcome', async () => {
    const gameFlowService = new GameFlowService(
        new MockChallengeService(),
        new MockGameService()
    )

    const response = await gameFlowService.createGameFlow(createGamePreferences())

    const result = await response.json()

    const expectedResult = {
        isPlayerCreative: false,
        games: [
            createMockGame(1, 'Test Game'),
            createMockGame(2, 'Test Game 2'),
            createMockGame(3, 'Test Game 3'),
        ],
        playerChallenges: [
            {
                challenge: 'Test challenge',
                playerId: '2',
            },
        ] as PlayerChallenge[],
    }

    assertEquals(response.status, 201)
    assertEquals(response.headers.get('Content-Type'), 'application/json')

    assertEquals(result, expectedResult)
})

function createGamePreferences(): GamePreferences {
    return {
        playerPreferences: createPlayersPreferences(),
        isPlayerCreative: false,
        gameMinutes: 30,
        accessories: [],
    }
}

function createPlayersPreferences(): PlayerPreference[] {
    const players = createPlayers()

    return [
        {
            player_id: players[0].id,
            drunk: DrunkEnum.DRUNK,
            activity: ActivityEnum.HIGH,
        },
        {
            player_id: players[1].id,
            drunk: DrunkEnum.WASTED,
            activity: ActivityEnum.HIGH,
        },
    ]
}

function createPlayers(): Player[] {
    return [
        {
            id: '1',
            username: 'player1',
            created_at: new Date().toISOString(),
            is_guest: true,
        },
        {
            id: '2',
            username: 'player2',
            created_at: new Date().toISOString(),
            is_guest: true,
        },
    ]
}
