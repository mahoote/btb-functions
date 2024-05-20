import { PlayerPreference } from '../_types/gamePreferences.ts'

const roundToNearestEnum = (value: number): number => {
    const threshold = 2 / 3 // approximately 0.67

    if (value < threshold) {
        return 0
    } else if (value < 2 * threshold) {
        return 1
    } else {
        return 2
    }
}

const calculateAverages = (preferences: PlayerPreference[]) => {
    if (preferences.length === 0) return { avgDrunk: 0, avgActivity: 0 }

    const totalDrunk: number = preferences.reduce(
        (sum, preference) => sum + preference.drunk,
        0
    )
    const totalActivity: number = preferences.reduce(
        (sum, preference) => sum + preference.activity,
        0
    )

    const avgDrunk = roundToNearestEnum(totalDrunk / preferences.length)
    const avgActivity = roundToNearestEnum(totalActivity / preferences.length)

    return { avgDrunk, avgActivity }
}

export default calculateAverages
