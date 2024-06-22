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
    private _fetchGameCalls = 0
    private _state? = 1

    constructor(state?: number) {
        this._state = state
    }

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
        this._fetchGameCalls++

        switch (this._state) {
            case 3:
                return undefined!
            case 2:
                return this.ReturnGameDtoButFailOnCalls1and2(
                    category,
                    accessories,
                    audience,
                    drunkLevel,
                    activityLevel,
                    maxMinutes
                )
            default:
                return this.ReturnGameDto(
                    category,
                    accessories,
                    audience,
                    drunkLevel,
                    activityLevel,
                    maxMinutes
                )
        }
    }

    private async ReturnGameDto(
        category: GameCategoryEnum,
        accessories: AccessoryEnum[],
        audience?: GameAudienceEnum,
        drunkLevel?: DrunkEnum,
        activityLevel?: ActivityEnum,
        maxMinutes?: number
    ): Promise<GameDto> {
        const categoryIndex = category.valueOf()

        return {
            id: this._fetchGameCalls,
            created_at: '2024-06-01T12:00:00Z',
            min_players: 3,
            activity_level: activityLevel,
            drunk_level: drunkLevel,
            minutes: 4,
            game_type_id: 1,
            descriptions: ['This is a test game.'],
            intro_description: 'Coolest test game ever!',
            name: `Test Game ${this._fetchGameCalls}`,
            game_category: {
                id: categoryIndex,
                name: GameCategoryEnum[categoryIndex],
            },
            game_has_accessory: [],
        }
    }

    private async ReturnGameDtoButFailOnCalls1and2(
        category: GameCategoryEnum,
        accessories: AccessoryEnum[],
        audience?: GameAudienceEnum,
        drunkLevel?: DrunkEnum,
        activityLevel?: ActivityEnum,
        maxMinutes?: number
    ): Promise<GameDto> {
        const categoryIndex = category.valueOf()

        if (this._fetchGameCalls === 1 || this._fetchGameCalls === 2) {
            return undefined!
        }

        return {
            id: this._fetchGameCalls,
            created_at: '2024-06-01T12:00:00Z',
            min_players: 3,
            activity_level: activityLevel,
            drunk_level: drunkLevel,
            minutes: 4,
            game_type_id: 1,
            descriptions: ['This is a test game.'],
            intro_description: 'Coolest test game ever!',
            name: `Test Game ${this._fetchGameCalls}`,
            game_category: {
                id: categoryIndex,
                name: GameCategoryEnum[categoryIndex],
            },
            game_has_accessory: [],
        }
    }
}
