import { IChallengeRepository } from '../interfaces/IRepository.ts'
import { IChallengeService } from '../interfaces/IService.ts'
import { PlayerChallenge } from '../types/gameFlow.ts'
import { Challenge } from '../types/challenge.ts'

export default class ChallengeService implements IChallengeService {
    constructor(private challengeRepository: IChallengeRepository) {}

    /**
     * Maps through the list of playerIds and fetches a random challenge for each player.
     * @param playerIds
     */
    public async assemblePlayerChallengeList(playerIds: string[]): Promise<PlayerChallenge[]> {
        return await Promise.all(
            playerIds.map(async (playerId): Promise<PlayerChallenge> => {
                const challenge: Challenge =
                    await this.challengeRepository.fetchRandomChallenge()
                return {
                    playerId,
                    challenge: challenge.message,
                }
            })
        )
    }
}
