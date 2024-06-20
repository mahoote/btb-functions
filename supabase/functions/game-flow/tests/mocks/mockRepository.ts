import { IChallengeRepository, IGameRepository } from '../../interfaces/IRepository.ts'
import { Challenge } from '../../types/challenge.ts'
import { Game } from '../../types/game.ts'

export class MockChallengeRepository implements IChallengeRepository {
    async fetchRandomChallenge(): Promise<Challenge> {
        return { id: 1, message: 'Mission: Get wasted!', created_at: 'now' }
    }
}

export class MockGameRepository implements IGameRepository {
    async fetchGame(): Promise<Game> {
        return {
            id: 1,
            created_at: '2024-06-01T12:00:00Z',
            min_players: 3,
            activity_level: 1,
            drunk_level: 2,
            minutes: 3,
            game_type_id: 1,
            game_category_id: 3,
            descriptions: ['This is a test game.'],
            intro_description: 'Coolest test game ever!',
            name: 'Test Game',
        }
    }
}
