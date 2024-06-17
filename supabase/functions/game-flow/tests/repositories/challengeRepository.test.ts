import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import ChallengeRepository from '../../repositories/challengeRepository.ts'
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import { IChallengeRepository } from '../../interfaces/IRepository.ts'

const mockSupabaseClient = {
    from: () => ({
        select: () => ({
            limit: () => ({
                single: async () => ({
                    data: {
                        id: '1',
                        message: 'Test Challenge',
                        created_at: 'now',
                    },
                    error: null,
                }),
            }),
        }),
    }),
}

Deno.test('fetchRandomChallenge - should return a challenge', async () => {
    const challengeRepository: IChallengeRepository = new ChallengeRepository(
        mockSupabaseClient as unknown as SupabaseClient
    )

    const challenge = await challengeRepository.fetchRandomChallenge()
    assertEquals(challenge.message, 'Test Challenge')
    assertEquals(challenge.created_at, 'now')
})
