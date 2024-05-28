import { createErrorResponse, createResponse } from '../_shared/response.ts'
import { PlayerPreference } from '../_types/gamePreferences.ts'
import calculateAverages from '../_utils/calculateAverages.ts'

function createGame(preferences: PlayerPreference[]) {
    if (!preferences || !Array.isArray(preferences)) {
        return createErrorResponse('Incorrect format!', 400)
    }

    const averages = calculateAverages(preferences)

    return createResponse(averages)
}

export default createGame
