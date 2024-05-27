import {
    PlayerPreference,
    PreferenceAverages,
} from '../_types/gamePreferences.ts'

function roundToNearestEnum(value: number): number {
    const threshold = 2 / 3 // approximately 0.67

    if (value < threshold) {
        return 0
    } else if (value < 2 * threshold) {
        return 1
    } else {
        return 2
    }
}

function getAverageMargin(average: number, roundedAverage: number): number {
    return Number(Math.abs(average - roundedAverage).toFixed(2))
}

function calculateAverages(
    preferences: PlayerPreference[]
): PreferenceAverages {
    if (preferences.length === 0) return { avgDrunk: 0, avgActivity: 0 }

    const totalDrunk: number = preferences.reduce(
        (sum, preference) => sum + preference.drunk,
        0
    )
    const totalActivity: number = preferences.reduce(
        (sum, preference) => sum + preference.activity,
        0
    )

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
