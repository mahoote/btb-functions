import { createResponse } from '../../_shared/response.ts'
import { GamePreferences } from '../types/gamePreferences.ts'
import calculateAverages from '../utils/calculateAverages.ts'
import { filterPlayerIdsWithChallenge } from '../utils/challengeUtils.ts'
import GameFlow, { PlayerMission } from '../types/gameFlow.ts'

function setPlayerMissions(playersWithMission: string[]) {
    return playersWithMission.map(
        (playerId): PlayerMission => ({
            playerId,
            mission: 'Get wasted',
        })
    )
}

function createGameFlow(preferences: GamePreferences) {
    const gameFlow: GameFlow = {
        isPlayerCreative: preferences.isPlayerCreative,
    }

    const averages = calculateAverages(preferences.playerPreferences)

    const playersWithMission = filterPlayerIdsWithChallenge(
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
