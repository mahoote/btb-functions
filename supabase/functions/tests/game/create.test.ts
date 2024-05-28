import { ActivityEnum, DrunkEnum } from '../../_enums/preferencesEnum.ts'
import { PlayerPreference } from '../../_types/gamePreferences.ts'

Deno.test('should create a game flow', () => {})

function createPlayers(): PlayerPreference[] {
    const player1: PlayerPreference = {
        player_id: 'uuid',
        drunk: DrunkEnum.DRUNK,
        activity: ActivityEnum.HIGH,
    }
    const player2: PlayerPreference = {
        player_id: 'uuid',
        drunk: DrunkEnum.TIPSY,
        activity: ActivityEnum.MEDIUM,
    }

    return [player1, player2]
}
