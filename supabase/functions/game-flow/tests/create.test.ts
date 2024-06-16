import { ActivityEnum, DrunkEnum } from '../types/preferencesEnum.ts'
import { GamePreferences, PlayerPreference } from '../types/gamePreferences.ts'
import createGameFlow from '../services/create.ts'
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { Player } from '../types/player.ts'

Deno.test('should create a game flow', async () => {
    const response = await createGameFlow(createGamePreferences())

    const result = await response.json()

    const expectedResult = {
        isPlayerCreative: false,
        playerMissions: [
            {
                mission: 'Mission: Get wasted!',
                playerId: '2',
            },
        ],
    }

    assertEquals(response.status, 201)
    assertEquals(response.headers.get('Content-Type'), 'application/json')

    assertEquals(result, expectedResult)
})

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

function createGamePreferences(): GamePreferences {
    return {
        playerPreferences: createPlayersPreferences(),
        isPlayerCreative: false,
        gameMinutes: 30,
    }
}
