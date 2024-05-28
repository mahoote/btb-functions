import {
    PlayerPreference,
    PreferenceAverages,
} from '../../_types/gamePreferences.ts'
import { ActivityEnum, DrunkEnum } from '../../_enums/preferencesEnum.ts'
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import calculateAverages from '../../_utils/calculateAverages.ts'

Deno.test('should get averages as 1', () => {
    const result: PreferenceAverages = calculateAverages(createPlayers())

    const expectedResult: PreferenceAverages = {
        avgDrunk: 1,
        avgActivity: 1,
        drunkAvgMargin: 0,
        activityAvgMargin: 0.25,
    }

    assertEquals(result, expectedResult)
})

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
    const player3: PlayerPreference = {
        player_id: 'uuid',
        drunk: DrunkEnum.WASTED,
        activity: ActivityEnum.LOW,
    }
    const player4: PlayerPreference = {
        player_id: 'uuid',
        drunk: DrunkEnum.DRUNK,
        activity: ActivityEnum.LOW,
    }

    return [player1, player2, player3, player4]
}
