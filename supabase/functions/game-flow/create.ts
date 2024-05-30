import { createResponse } from '../_shared/response.ts'
import { GamePreferences } from '../_types/gamePreferences.ts'
import calculateAverages from '../_utils/calculateAverages.ts'
import { createMission, getPlayersWithMission } from '../_utils/missionUtils.ts'
import GameFlow from '../_types/gameFlow.ts'

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
        gameFlow.playerMissions = []

        playersWithMission.forEach((playerId) => {
            gameFlow.playerMissions?.push({
                playerId,
                mission: createMission(),
            })
        })
    }

    // TODO: Give players with mission a mission.

    // TODO: Fetch games from db. Add a logic for finding games with correct criteria.

    // TODO: Add other stuff like betting and push your luck.

    return createResponse(JSON.stringify(gameFlow), 201)
}

export default createGameFlow
