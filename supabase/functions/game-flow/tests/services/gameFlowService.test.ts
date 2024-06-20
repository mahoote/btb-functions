import { ActivityEnum, DrunkEnum } from '../../types/gameEnum.ts'
import { GamePreferences, PlayerPreference } from '../../types/gamePreferences.ts'
import { Player } from '../../types/player.ts'
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/assert_equals.ts'
import GameFlowService from '../../services/gameFlowService.ts'
import { MockChallengeRepository } from '../mocks/mockRepository.ts'
import { PlayerChallenge } from '../../types/gameFlow.ts'

Deno.test('gameFlowService - should create flow with one playerChallenge', async () => {
    const gameFlowService = new GameFlowService(new MockChallengeRepository())

    const response = await gameFlowService.createGameFlow(createGamePreferences())

    const result = await response.json()

    const expectedResult = {
        isPlayerCreative: false,
        playerChallenges: [
            {
                challenge: 'Mission: Get wasted!',
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
