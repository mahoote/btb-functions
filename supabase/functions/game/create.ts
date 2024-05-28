import { createErrorResponse, createResponse } from '../_shared/response.ts'
import { PlayerPreference } from '../_types/gamePreferences.ts'
import calculateAverages from '../_utils/calculateAverages.ts'
import { fetchPlayers } from '../_repositories/playerRepository.ts'

async function createGame(preferences: PlayerPreference[]) {
    if (!preferences || !Array.isArray(preferences)) {
        return createErrorResponse('Incorrect format!', 400)
    }

    // TODO: Use this logic.
    const players = await fetchPlayers()

    const averages = calculateAverages(preferences)

    return createResponse(averages, 201)
}

export default createGame
