import { createResponse } from '../../_shared/response.ts'
import { GamePreferences } from '../types/gamePreferences.ts'
import calculateAverages from '../utils/calculateAverages.ts'
import { filterPlayerIdsWithChallenge } from '../utils/challengeUtils.ts'
import GameFlow, { PlayerChallenge } from '../types/gameFlow.ts'

function setPlayerChallenges(playerIds: string[]) {
    return playerIds.map(
        (playerId): PlayerChallenge => ({
            playerId,
            challenge: 'Get wasted',
        })
    )
}

function createGameFlow(preferences: GamePreferences) {
    const gameFlow: GameFlow = {
        isPlayerCreative: preferences.isPlayerCreative,
    }

    const averages = calculateAverages(preferences.playerPreferences)

    const playerIdsWithChallenge = filterPlayerIdsWithChallenge(
        averages,
        preferences.playerPreferences
    )

    if (playerIdsWithChallenge.length > 0 && !preferences.isPlayerCreative) {
        gameFlow.playerChallenge = setPlayerChallenges(playerIdsWithChallenge)
    }

    // TODO: Fetch games from db. Add a logic for finding games with correct criteria.

    // TODO: Add other stuff like betting and push your luck.

    return createResponse(JSON.stringify(gameFlow), 201)
}

export default createGameFlow
