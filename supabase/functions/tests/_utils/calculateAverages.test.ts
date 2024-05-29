import {
    PlayerPreference,
    PreferenceAverages,
} from '../../_types/gamePreferences.ts'
import { ActivityEnum, DrunkEnum } from '../../_enums/preferencesEnum.ts'
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import calculateAverages from '../../_utils/calculateAverages.ts'

Deno.test('should get averages as 1', () => {
    const result: PreferenceAverages = calculateAverages(
        createPlayersPreferences()
    )

    const expectedResult: PreferenceAverages = {
        avgDrunk: 1,
        avgActivity: 1,
        drunkAvgMargin: 0,
        activityAvgMargin: 0.25,
    }

    assertEquals(result, expectedResult)
})

function createPlayersPreferences(): PlayerPreference[] {
    return [
        {
            player_id: '1',
            drunk: DrunkEnum.DRUNK,
            activity: ActivityEnum.HIGH,
        },
        {
            player_id: '2',
            drunk: DrunkEnum.TIPSY,
            activity: ActivityEnum.MEDIUM,
        },
        {
            player_id: '3',
            drunk: DrunkEnum.WASTED,
            activity: ActivityEnum.LOW,
        },
        {
            player_id: '4',
            drunk: DrunkEnum.DRUNK,
            activity: ActivityEnum.LOW,
        },
    ]
}
