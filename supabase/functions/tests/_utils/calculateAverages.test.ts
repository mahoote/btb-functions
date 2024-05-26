import {
    PlayerPreference,
    PreferenceAverages,
} from '../../_types/gamePreferences.ts'
import { ActivityEnum, DrunkEnum } from '../../_enums/preferencesEnum.ts'
import { assertEquals } from 'https://deno.land/std/assert/mod.ts'
import calculateAverages from '../../_utils/calculateAverages.ts'

Deno.test('should get averages as 1', async () => {
    const player1 = newPlayerPreferences(DrunkEnum.DRUNK, ActivityEnum.HIGH)
    const player2 = newPlayerPreferences(DrunkEnum.TIPSY, ActivityEnum.MEDIUM)
    const player3 = newPlayerPreferences(DrunkEnum.WASTED, ActivityEnum.LOW)
    const player4 = newPlayerPreferences(DrunkEnum.DRUNK, ActivityEnum.LOW)

    const result: PreferenceAverages = calculateAverages([
        player1,
        player2,
        player3,
        player4,
    ])

    const expectedResult: PreferenceAverages = {
        avgDrunk: 1,
        avgActivity: 1,
        drunkAvgMargin: 0,
        activityAvgMargin: 0.25,
    }

    assertEquals(result, expectedResult)
})

function newPlayerPreferences(
    drunk: DrunkEnum,
    activity: ActivityEnum
): PlayerPreference {
    return { drunk, activity }
}
