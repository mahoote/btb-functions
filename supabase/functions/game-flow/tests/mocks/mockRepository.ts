import { IChallengeRepository } from '../../interfaces/IRepository.ts'
import { Challenge } from '../../types/challenge.ts'

export class MockChallengeRepository implements IChallengeRepository {
    async fetchRandomChallenge(): Promise<Challenge> {
        return { id: '1', message: 'Mission: Get wasted!', created_at: 'now' }
    }
}
