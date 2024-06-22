import { GameDto } from './game.ts'

type PlayerChallenge = {
    playerId: string
    challenge: string
}

type GameFlow = {
    isPlayerCreative: boolean
    playerChallenges?: PlayerChallenge[]
    games: GameDto[]
}

export default GameFlow
export type { PlayerChallenge }
