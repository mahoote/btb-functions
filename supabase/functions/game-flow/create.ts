import { createResponse } from '../_shared/response.ts'
import { GamePreferences } from '../_types/gamePreferences.ts'
import calculateAverages from '../_utils/calculateAverages.ts'
import { createMission, getPlayersWithMission } from '../_utils/missionUtils.ts'
import GameFlow, { PlayerMission } from '../_types/gameFlow.ts'

function setPlayerMissions(playersWithMission: string[]) {
    return playersWithMission.map(
        (playerId): PlayerMission => ({
            playerId,
            mission: createMission(),
        })
    )
}

function createGameFlow(preferences: GamePreferences) {
    const gameFlow: GameFlow = {
        isPlayerCreative: preferences.isPlayerCreative,
    }

    const averages = calculateAverages(preferences.playerPreferences)

    const playersWithMission = getPlayersWithMission(
        averages,
        preferences.playerPreferences
    )

    if (playersWithMission.length > 0 && !preferences.isPlayerCreative) {
        gameFlow.playerMissions = setPlayerMissions(playersWithMission)
    }

    // TODO: Fetch games from db. Add a logic for finding games with correct criteria.

    // TODO: Add other stuff like betting and push your luck.

    return createResponse(JSON.stringify(gameFlow), 201)
}

export default createGameFlow
