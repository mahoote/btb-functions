import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { GameCategoryEnum } from '../../types/gameEnum.ts'
import { getAllCategories } from '../../utils/gameUtils.ts'

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
