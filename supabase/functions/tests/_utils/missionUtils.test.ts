import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { PlayerPreference } from '../../_types/gamePreferences.ts'
import { ActivityEnum, DrunkEnum } from '../../_enums/preferencesEnum.ts'
import {
    createMission,
    getPlayersWithMission,
} from '../../_utils/missionUtils.ts'

Deno.test('getPlayersWithMission - should get 1 player id', () => {
    const averages = {
        avgDrunk: 1,
        avgActivity: 1,
        drunkAvgMargin: 0,
        activityAvgMargin: 0.25,
    }

    const playerPreferences: PlayerPreference[] = [
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

    const result = getPlayersWithMission(averages, playerPreferences)
    const expectedResult = ['3']

    assertEquals(result, expectedResult)
})

Deno.test('getPlayersWithMission - should get 2 player ids', () => {
    const averages = {
        avgDrunk: 1,
        avgActivity: 0,
        drunkAvgMargin: 0.2,
        activityAvgMargin: 0.6,
    }

    const playerPreferences: PlayerPreference[] = [
        {
            player_id: '1',
            drunk: DrunkEnum.TIPSY,
            activity: ActivityEnum.HIGH,
        },
        {
            player_id: '2',
            drunk: DrunkEnum.DRUNK,
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
        {
            player_id: '5',
            drunk: DrunkEnum.WASTED,
            activity: ActivityEnum.LOW,
        },
    ]

    const result = getPlayersWithMission(averages, playerPreferences)
    const expectedResult = ['3', '5']

    assertEquals(result, expectedResult)
})

Deno.test('getPlayersWithMission - should get no player ids', () => {
    const averages = {
        avgDrunk: 1,
        avgActivity: 0,
        drunkAvgMargin: 0,
        activityAvgMargin: 0,
    }

    const playerPreferences: PlayerPreference[] = [
        {
            player_id: '1',
            drunk: DrunkEnum.DRUNK,
            activity: ActivityEnum.HIGH,
        },
        {
            player_id: '2',
            drunk: DrunkEnum.DRUNK,
            activity: ActivityEnum.MEDIUM,
        },
    ]

    const result = getPlayersWithMission(averages, playerPreferences)
    const expectedResult: string[] = []

    assertEquals(result, expectedResult)
})

Deno.test('getPlayersWithMission - should get all player ids', () => {
    const averages = {
        avgDrunk: 2,
        avgActivity: 0,
        drunkAvgMargin: 0,
        activityAvgMargin: 0,
    }

    const playerPreferences: PlayerPreference[] = [
        {
            player_id: '1',
            drunk: DrunkEnum.WASTED,
            activity: ActivityEnum.HIGH,
        },
        {
            player_id: '2',
            drunk: DrunkEnum.WASTED,
            activity: ActivityEnum.MEDIUM,
        },
    ]

    const result = getPlayersWithMission(averages, playerPreferences)

    const expectedResult = playerPreferences.map(
        (preference) => preference.player_id
    )

    assertEquals(result, expectedResult)
})

Deno.test('createMission - should return mission', () => {
    const result = createMission()

    const expectedResult = 'Mission: Get wasted!'

    assertEquals(result, expectedResult)
})
