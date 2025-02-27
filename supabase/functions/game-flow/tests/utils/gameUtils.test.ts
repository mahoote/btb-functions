import { assertAlmostEquals, assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'

import { GameCategoryEnum } from '../../types/gameEnum.ts'
import { getAllCategories, getAveragesWithChanceForMargin } from '../../utils/gameUtils.ts'

Deno.test('getAllCategories - should return all categories', () => {
    const result = getAllCategories()
    const expectedResult = [
        GameCategoryEnum.QUICK_THINKING,
        GameCategoryEnum.SKILLS,
        GameCategoryEnum.SOCIAL_INTERACTIVE,
        GameCategoryEnum.STRATEGY,
        GameCategoryEnum.TEAMS,
        GameCategoryEnum.TRIVIA_AND_KNOWLEDGE,
    ]

    assertEquals(result, expectedResult)
})

Deno.test(
    'getAveragesWithChanceForMargin - should return calculated averages with 1 as averages',
    () => {
        const mockAverages = {
            avgDrunk: 1,
            avgActivity: 1,
            drunkAvgMargin: 0.2,
            activityAvgMargin: 0.2,
        }

        const sampleSize = 10000 // Sample size for statistical significance
        const resultsDrunk: number[] = []
        const resultsActivity: number[] = []

        for (let i = 0; i < sampleSize; i++) {
            const [avgDrunk, avgActivity] = getAveragesWithChanceForMargin(mockAverages)
            resultsDrunk.push(avgDrunk)
            resultsActivity.push(avgActivity)
        }

        const countDrunkZero = countOccurrences(resultsDrunk, 0)
        const countDrunkOne = countOccurrences(resultsDrunk, 1)
        const countDrunkTwo = countOccurrences(resultsDrunk, 2)

        const drunkZeroPercentage = toPercentage(countDrunkZero, sampleSize)
        const drunkOnePercentage = toPercentage(countDrunkOne, sampleSize)
        const drunkTwoPercentage = toPercentage(countDrunkTwo, sampleSize)

        const countActivityZero = countOccurrences(resultsActivity, 0)
        const countActivityOne = countOccurrences(resultsActivity, 1)
        const countActivityTwo = countOccurrences(resultsActivity, 2)

        const activityZeroPercentage = toPercentage(countActivityZero, sampleSize)
        const activityOnePercentage = toPercentage(countActivityOne, sampleSize)
        const activityTwoPercentage = toPercentage(countActivityTwo, sampleSize)

        const tolerance = 2 // 2% tolerance

        assertAlmostEquals(drunkZeroPercentage, 10, tolerance)
        assertAlmostEquals(drunkOnePercentage, 80, tolerance)
        assertAlmostEquals(drunkTwoPercentage, 10, tolerance)

        assertAlmostEquals(activityZeroPercentage, 10, tolerance)
        assertAlmostEquals(activityOnePercentage, 80, tolerance)
        assertAlmostEquals(activityTwoPercentage, 10, tolerance)
    }
)

Deno.test(
    'getAveragesWithChanceForMargin - should return calculated averages with 0 and 2 as averages',
    () => {
        const mockAverages = {
            avgDrunk: 2,
            avgActivity: 0,
            drunkAvgMargin: 0.35,
            activityAvgMargin: 0.15,
        }

        const sampleSize = 10000 // Sample size for statistical significance
        const resultsDrunk: number[] = []
        const resultsActivity: number[] = []

        for (let i = 0; i < sampleSize; i++) {
            const [avgDrunk, avgActivity] = getAveragesWithChanceForMargin(mockAverages)
            resultsDrunk.push(avgDrunk)
            resultsActivity.push(avgActivity)
        }

        const countDrunkZero = countOccurrences(resultsDrunk, 0)
        const countDrunkOne = countOccurrences(resultsDrunk, 1)
        const countDrunkTwo = countOccurrences(resultsDrunk, 2)

        const drunkZeroPercentage = toPercentage(countDrunkZero, sampleSize)
        const drunkOnePercentage = toPercentage(countDrunkOne, sampleSize)
        const drunkTwoPercentage = toPercentage(countDrunkTwo, sampleSize)

        const countActivityZero = countOccurrences(resultsActivity, 0)
        const countActivityOne = countOccurrences(resultsActivity, 1)
        const countActivityTwo = countOccurrences(resultsActivity, 2)

        const activityZeroPercentage = toPercentage(countActivityZero, sampleSize)
        const activityOnePercentage = toPercentage(countActivityOne, sampleSize)
        const activityTwoPercentage = toPercentage(countActivityTwo, sampleSize)

        const tolerance = 2 // 2% tolerance

        assertAlmostEquals(drunkZeroPercentage, 0, tolerance)
        assertAlmostEquals(drunkOnePercentage, 35, tolerance)
        assertAlmostEquals(drunkTwoPercentage, 65, tolerance)

        assertAlmostEquals(activityZeroPercentage, 85, tolerance)
        assertAlmostEquals(activityOnePercentage, 15, tolerance)
        assertAlmostEquals(activityTwoPercentage, 0, tolerance)
    }
)

function countOccurrences(arr: number[], value: number): number {
    return arr.filter(num => num === value).length
}

function toPercentage(value: number, total: number): number {
    return (value / total) * 100
}
