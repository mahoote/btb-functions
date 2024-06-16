type PlayerChallenge = {
    playerId: string
    challenge: string
}

type GameFlow = {
    playerChallenges?: PlayerChallenge[]
    isPlayerCreative: boolean
}

export default GameFlow
export type { PlayerChallenge }
