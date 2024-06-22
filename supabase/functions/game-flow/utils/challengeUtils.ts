import { PlayerPreference, PreferenceAverages } from '../types/gamePreferences.ts'
import { DrunkEnum } from '../types/gameEnum.ts'

/**
 * If the player wants to get more drunk than the average, they will be given a challenge.
 * They will also get a challenge if they want to get wasted.
 * @param averages
 * @param preferences
 */
function filterPlayerIdsWithChallenge(
    averages: PreferenceAverages,
    preferences: PlayerPreference[]
): string[] {
    const avgDrunk = averages.avgDrunk

    return preferences
        .filter(preference => {
            const drunk = preference.drunk

            if (drunk > avgDrunk || drunk === DrunkEnum.WASTED) {
                return true
            }
        })
        .map((preference: PlayerPreference) => preference.player_id)
}

export { filterPlayerIdsWithChallenge }
