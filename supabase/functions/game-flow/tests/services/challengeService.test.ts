import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'

import { MockChallengeRepository } from '../mocks/mockRepository.ts'
import ChallengeService from '../../services/challengeService.ts'
import { IChallengeService } from '../../interfaces/IService.ts'

Deno.test(
    'assemblePlayerChallengeList - should return a list of player challenges',
    async () => {
        const mockChallengeRepository = new MockChallengeRepository()
        const challengeService: IChallengeService = new ChallengeService(
            mockChallengeRepository
        )

        const playerIds = ['1', '2', '3']

        const result = await challengeService.assemblePlayerChallengeList(playerIds)

        assertEquals(result.length, playerIds.length)
        assertEquals(result[0].playerId, '1')
        assertEquals(result[0].challenge, 'Get wasted!')
    }
)
