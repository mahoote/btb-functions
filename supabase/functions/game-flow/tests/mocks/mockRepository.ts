import { IChallengeRepository, IGameRepository } from '../../interfaces/IRepository.ts'
import { Challenge } from '../../types/challenge.ts'
import { GameDto } from '../../types/game.ts'
import {
    AccessoryEnum,
    ActivityEnum,
    DrunkEnum,
    GameAudienceEnum,
    GameCategoryEnum,
} from '../../types/gameEnum.ts'

export class MockChallengeRepository implements IChallengeRepository {
    async fetchRandomChallenge(): Promise<Challenge> {
        return { id: 1, message: 'Mission: Get wasted!', created_at: 'now' }
    }
}

export class MockGameRepository implements IGameRepository {
    private fetchGameCalls = 0

    /**
     * Is used to check if the amount of calls to this function is correct.
     * Ensures that the categoryIndex is always within the category length.
     * @param category
     * @param accessories
     * @param audience
     * @param drunkLevel
     * @param activityLevel
     * @param maxMinutes
     */
    async fetchGame(
        category: GameCategoryEnum,
        accessories: AccessoryEnum[],
        audience?: GameAudienceEnum,
        drunkLevel?: DrunkEnum,
        activityLevel?: ActivityEnum,
        maxMinutes?: number
    ): Promise<GameDto> {
        this.fetchGameCalls++

        const categoryIndex = category.valueOf()

        return {
            id: this.fetchGameCalls,
            created_at: '2024-06-01T12:00:00Z',
            min_players: 3,
            activity_level: activityLevel,
            drunk_level: drunkLevel,
            minutes: 4,
            game_type_id: 1,
            descriptions: ['This is a test game.'],
            intro_description: 'Coolest test game ever!',
            name: `Test Game ${this.fetchGameCalls}`,
            game_category: {
                id: categoryIndex,
                name: GameCategoryEnum[categoryIndex],
            },
            game_has_accessory: [],
        }
    }
}
