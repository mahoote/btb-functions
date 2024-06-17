import { assertEquals, assertRejects } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import ChallengeRepository from '../../repositories/challengeRepository.ts'
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import { IChallengeRepository } from '../../interfaces/IRepository.ts'

Deno.test('fetchRandomChallenge - should return a challenge', async () => {
    const repository: IChallengeRepository = new ChallengeRepository(
        mockClient as unknown as SupabaseClient
    )

    const challenge = await repository.fetchRandomChallenge()
    assertEquals(challenge.message, 'Test Challenge')
    assertEquals(challenge.created_at, 'now')
})

Deno.test('fetchRandomChallenge - should return a query error', async () => {
    const repository: IChallengeRepository = new ChallengeRepository(
        mockClientError as unknown as SupabaseClient
    )

    await assertRejects(
        async () => {
            await repository.fetchRandomChallenge()
        },
        Error,
        'Simulated PostgreSQL error'
    )
})

const mockClient = {
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

const mockClientError = {
    from: () => ({
        select: () => ({
            limit: () => ({
                single: async () => ({
                    data: null,
                    error: new Error('Simulated PostgreSQL error'),
                }),
            }),
        }),
    }),
}
