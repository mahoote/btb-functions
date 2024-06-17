import { Challenge } from '../types/challenge.ts'

export interface IChallengeRepository {
    fetchRandomChallenge(): Promise<Challenge>
}
