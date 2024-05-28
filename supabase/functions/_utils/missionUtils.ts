import {
    PlayerPreference,
    PreferenceAverages,
} from '../_types/gamePreferences.ts'
import { DrunkEnum } from '../_enums/preferencesEnum.ts'

/**
 * If the player wants to get more drunk than the average, they will be given a mission.
 * @param averages
 * @param preferences
 */
function getPlayersWithMission(
    averages: PreferenceAverages,
    preferences: PlayerPreference[]
) {
    const avgDrunk = averages.avgDrunk

    return preferences
        .filter((preference) => {
            const drunk = preference.drunk

            if (drunk > avgDrunk) {
                return true
            }
            if (avgDrunk === DrunkEnum.WASTED && drunk === DrunkEnum.WASTED) {
                return true
            }
        })
        .map((preference: PlayerPreference) => preference.player_id)
}

export { getPlayersWithMission }
