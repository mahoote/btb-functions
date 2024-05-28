import { createErrorResponse, createResponse } from '../_shared/response.ts'
import { GamePreferences } from '../_types/gamePreferences.ts'
import calculateAverages from '../_utils/calculateAverages.ts'

function createGame(preferences: GamePreferences) {
    if (!preferences) {
        return createErrorResponse('Incorrect format!', 400)
    }

    const averages = calculateAverages(preferences.playerPreferences)
    console.log(averages)

    return createResponse('Game created!', 201)
}

export default createGame
