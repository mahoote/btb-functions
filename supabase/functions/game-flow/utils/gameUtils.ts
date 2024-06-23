import { GameCategoryEnum } from '../types/gameEnum.ts'
import { PreferenceAverages } from '../types/gamePreferences.ts'

export function getAllCategories(): GameCategoryEnum[] {
    return Object.values(GameCategoryEnum).filter(
        value => typeof value === 'number'
    ) as GameCategoryEnum[]
}

/**
 * Returns the averages with a chance for the given margin.
 * @param averages
 */
export function getAveragesWithChanceForMargin(
    averages: PreferenceAverages
): [number, number] {
    const drunkAvgMargin = averages?.drunkAvgMargin ?? 0
    const activityAvgMargin = averages?.activityAvgMargin ?? 0

    const avgDrunk = calculateAveragesWithMargin(averages.avgDrunk, drunkAvgMargin)
    const avgActivity = calculateAveragesWithMargin(averages.avgActivity, activityAvgMargin)

    return [avgDrunk, avgActivity]
}

/**
 * If the average is 1, there is a chance to get 0 or 2 based on the margin.
 * If the average is 0 or 2, there is a chance to get 1 based on the margin.
 * @param average
 * @param margin
 */
function calculateAveragesWithMargin(average: number, margin: number): number {
    const chance = Math.random()

    if (average === 1) {
        return chance <= margin ? getRandomZeroOrTwo() : average
    }

    return chance <= margin ? 1 : average
}

function getRandomZeroOrTwo(): number {
    return Math.random() < 0.5 ? 0 : 2
}
