import { ActivityEnum, DrunkEnum } from '../../_enums/preferencesEnum.ts'
import { PlayerPreference } from '../../_types/gamePreferences.ts'
import createGame from '../../game/create.ts'
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { Player } from '../../_types/player.ts'

Deno.test('should create a game flow', async () => {
    const response = createGame(createPlayersPreferences())

    const data = await response.json()

    assertEquals(response.status, 201)
    assertEquals(response.headers.get('Content-Type'), 'application/json')

    assertEquals(data, {
        avgDrunk: 2,
        avgActivity: 2,
        drunkAvgMargin: 0,
        activityAvgMargin: 0,
    })
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
            drunk: DrunkEnum.WASTED,
            activity: ActivityEnum.HIGH,
        },
        {
            player_id: players[1].id,
            drunk: DrunkEnum.WASTED,
            activity: ActivityEnum.HIGH,
        },
    ]
}
