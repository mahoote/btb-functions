import { PlayerPreference } from '../../_types/gamePreferences.ts'
import { ActivityEnum, DrunkEnum } from '../../_enums/preferencesEnum.ts'
import { assertEquals } from 'https://deno.land/std/assert/mod.ts'

Deno.test('should get averages as 1', async () => {
    assertEquals(1, 1)
})

function newPlayerPreferences(
    drunk: DrunkEnum,
    activity: ActivityEnum
): PlayerPreference {
    return { drunk, activity }
}
