import { GameCategoryEnum } from '../types/gameEnum.ts'

export function getAllCategories(): GameCategoryEnum[] {
    return Object.values(GameCategoryEnum).filter(
        value => typeof value === 'number'
    ) as GameCategoryEnum[]
}
