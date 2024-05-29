import { createResponse } from '../_shared/response.ts'
import { GamePreferences } from '../_types/gamePreferences.ts'
import calculateAverages from '../_utils/calculateAverages.ts'
import { getPlayersWithMission } from '../_utils/missionUtils.ts'

function createGame(preferences: GamePreferences) {
    const averages = calculateAverages(preferences.playerPreferences)

    const playersWithMission = getPlayersWithMission(
        averages,
        preferences.playerPreferences
    )

    // TODO: Give players with mission a mission.

    // TODO: Fetch games from db. Add a logic for finding games with correct criteria.

    // TODO: Add other stuff like betting and push your luck.

    return createResponse(
        JSON.stringify(
            `Game created! Players id: ${playersWithMission} will get a mission.`
        ),
        201
    )
}

export default createGame
