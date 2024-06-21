import { PlayerPreference, PreferenceAverages } from '../types/gamePreferences.ts'
import { ActivityEnum, DrunkEnum } from '../types/gameEnum.ts'

/**
 * Based on the threshold that is approximately 0.67, round the average to the nearest enum.
 * This means that if the average is between 0 and 0.67, it will be rounded to 0.
 * If the average is between 0.67 and 1.33, it will be rounded to 1.
 * In this way, the decision is made based on the majority of the votes.
 * @param value
 */
function roundToNearestEnum(value: number): number {
    const threshold = 2 / 3

    if (value < threshold) {
        return 0
    } else if (value < 2 * threshold) {
        return 1
    } else {
        return 2
    }
}

/**
 * Calculate the margin between the average and the rounded average.
 * This is useful to determine how much the average is from the majority of the votes.
 * We use this function for probability calculation to choose games with criteria other than the average.
 * @param average
 * @param roundedAverage
 */
function getAverageMargin(average: number, roundedAverage: number): number {
    return Number(Math.abs(average - roundedAverage).toFixed(2))
}

/**
 * Calculate the average drunk and activity levels from a list of player preferences.
 * Checks if the inputs are valid. If not, default to 1.
 * @param preferences
 */
function calculateAverages(preferences: PlayerPreference[]): PreferenceAverages {
    if (preferences.length === 0)
        return { avgDrunk: DrunkEnum.TIPSY, avgActivity: ActivityEnum.LOW }

    const totalDrunk: number = preferences.reduce((sum, preference) => {
        const validDrunk =
            preference.drunk < DrunkEnum.TIPSY || preference.drunk > DrunkEnum.WASTED
                ? DrunkEnum.DRUNK
                : preference.drunk
        return sum + validDrunk
    }, 0)
    const totalActivity: number = preferences.reduce((sum, preference) => {
        const validActivity =
            preference.activity < ActivityEnum.LOW || preference.activity > ActivityEnum.HIGH
                ? ActivityEnum.MEDIUM
                : preference.activity
        return sum + validActivity
    }, 0)

    const avgDrunk = totalDrunk / preferences.length
    const avgActivity = totalActivity / preferences.length

    const roundedAvgDrunk = roundToNearestEnum(avgDrunk)
    const roundedAvgActivity = roundToNearestEnum(avgActivity)

    return {
        avgDrunk: roundedAvgDrunk,
        avgActivity: roundedAvgActivity,
        drunkAvgMargin: getAverageMargin(avgDrunk, roundedAvgDrunk),
        activityAvgMargin: getAverageMargin(avgActivity, roundedAvgActivity),
    }
}

export default calculateAverages
