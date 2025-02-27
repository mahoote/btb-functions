import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'

import { PlayerPreference, PreferenceAverages } from '../../types/gamePreferences.ts'
import { ActivityEnum, DrunkEnum } from '../../types/gameEnum.ts'
import calculateAverages from '../../utils/calculateAverages.ts'

Deno.test('calculateAverages - should get averages as 1', () => {
    const expectedResult: PreferenceAverages = {
        avgDrunk: 1,
        avgActivity: 1,
        drunkAvgMargin: 0,
        activityAvgMargin: 0.25,
    }

    const result: PreferenceAverages = calculateAverages(createPlayersPreferences())

    assertEquals(result, expectedResult)
})

Deno.test('calculateAverages - should get averages as 0', () => {
    const expectedResult: PreferenceAverages = { avgDrunk: 0, avgActivity: 0 }

    const result = calculateAverages([])

    assertEquals(result, expectedResult)
})

Deno.test('calculateAverages - should handle diverse player preferences', () => {
    const diversePreferences = [
        { player_id: '1', drunk: 0, activity: 0 },
        { player_id: '2', drunk: 1, activity: 1 },
        { player_id: '3', drunk: 2, activity: 2 },
    ]
    const expectedResult: PreferenceAverages = {
        avgDrunk: 1,
        avgActivity: 1,
        drunkAvgMargin: 0,
        activityAvgMargin: 0,
    }
    const result = calculateAverages(diversePreferences)
    assertEquals(result, expectedResult)
})

Deno.test('calculateAverages - should handle edge cases gracefully', () => {
    const edgeCasePreference = [{ player_id: '1', drunk: -1, activity: 3 }]
    const expectedResult = { avgDrunk: 1, avgActivity: 1 }

    const result = calculateAverages(edgeCasePreference)
    assertEquals(result.avgDrunk, expectedResult.avgDrunk)
    assertEquals(result.avgActivity, expectedResult.avgActivity)
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
