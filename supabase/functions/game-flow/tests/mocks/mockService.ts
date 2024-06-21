import { IChallengeService, IGameService } from '../../interfaces/IService.ts'
import { GameDto } from '../../types/game.ts'
import { PlayerChallenge } from '../../types/gameFlow.ts'
import { PreferenceAverages } from '../../types/gamePreferences.ts'

export class MockGameService implements IGameService {
    public async assembleGameList(
        totalMinutes: number,
        averages: PreferenceAverages
    ): Promise<GameDto[]> {
        return [
            createMockGame(1, 'Test Game'),
            createMockGame(2, 'Test Game 2'),
            createMockGame(3, 'Test Game 3'),
        ]
    }
}

export class MockChallengeService implements IChallengeService {
    public async assemblePlayerChallengeList(playerIds: string[]): Promise<PlayerChallenge[]> {
        return [{ playerId: '2', challenge: 'Test challenge' }]
    }
}

export function createMockGame(id: number, name: string) {
    return {
        id,
        created_at: '2024-06-01T12:00:00Z',
        min_players: 3,
        activity_level: 2,
        drunk_level: 2,
        minutes: 3,
        game_type_id: 1,
        descriptions: ['This is a test game.'],
        intro_description: 'Coolest test game ever!',
        name,
        game_category: { id: 2, name: 'Skills' },
        game_has_accessory: [],
    }
}
