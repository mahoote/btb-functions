import { ActivityEnum, DrunkEnum } from '../../_enums/preferencesEnum.ts'
import { PlayerPreference } from '../../_types/gamePreferences.ts'
import createGame from '../../game/create.ts'
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'

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

function createPlayersPreferences(): PlayerPreference[] {
    return [
        {
            player_id: '1',
            drunk: DrunkEnum.WASTED,
            activity: ActivityEnum.HIGH,
        },
        {
            player_id: '2',
            drunk: DrunkEnum.WASTED,
            activity: ActivityEnum.HIGH,
        },
    ]
}
