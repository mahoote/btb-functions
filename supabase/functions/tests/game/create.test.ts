import { ActivityEnum, DrunkEnum } from '../../_enums/preferencesEnum.ts'
import { PlayerPreference } from '../../_types/gamePreferences.ts'
import createGame from '../../game/create.ts'

Deno.test('should create a game flow', () => {
    const response = createGame(createPlayersPreferences())
})

function createPlayersPreferences(): PlayerPreference[] {
    return [
        {
            player_id: 'uuid',
            drunk: DrunkEnum.DRUNK,
            activity: ActivityEnum.HIGH,
        },
        {
            player_id: 'uuid',
            drunk: DrunkEnum.TIPSY,
            activity: ActivityEnum.MEDIUM,
        },
    ]
}
