type PlayerChallenge = {
    playerId: string
    challenge: string
}

type GameFlow = {
    playerChallenge?: PlayerChallenge[]
    isPlayerCreative: boolean
}

export default GameFlow
export type { PlayerChallenge }
