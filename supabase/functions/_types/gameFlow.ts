type PlayerMission = {
    playerId: string
    mission: string
}

type GameFlow = {
    playerMissions?: PlayerMission[]
    isPlayerCreative: boolean
}

export default GameFlow
