import { Challenge } from '../types/challenge.ts'
import { Game } from '../types/game.ts'

export interface IChallengeRepository {
    fetchRandomChallenge(): Promise<Challenge>
}

export interface IGameRepository {
    fetchGame(): Promise<Game>
}
