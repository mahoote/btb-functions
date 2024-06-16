import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { fetchRandomChallenge } from '../../repositories/challengeRepository.ts'
import '../../../_shared/globals.d.ts'
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

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

globalThis.supabaseClient = mockSupabaseClient as unknown as SupabaseClient

Deno.test('fetchRandomChallenge - should return a challenge', async () => {
    const challenge = await fetchRandomChallenge()
    assertEquals(challenge.message, 'Test Challenge')
    assertEquals(challenge.created_at, 'now')
})
