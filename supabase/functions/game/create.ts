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

    return createResponse('Game created!', 201)
}

export default createGame
