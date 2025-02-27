import { PlayerUpdateDto } from '../../_shared/types/player.ts'
import { updatePlayer } from '../repositories/playerRepository.ts'
import { assertEquals, assertRejects } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'

// Mock SupabaseClient
const mockSupabaseClient = {
    from: () => ({
        update: () => ({
            eq: () => ({
                select: () => ({
                    single: () =>
                        Promise.resolve({
                            data: {
                                user_id: '123',
                                username: 'updatedUser',
                                first_name: 'John',
                                last_name: 'Doe',
                                updated_at: new Date().toISOString(),
                            },
                            error: null,
                        }),
                }),
            }),
        }),
    }),
} as unknown as SupabaseClient

Deno.test('updatePlayer successfully updates and returns the player', async () => {
    const playerUpdateDto: PlayerUpdateDto = {
        user_id: '123',
        username: 'updatedUser',
        first_name: 'John',
        last_name: 'Doe',
    }

    const result = await updatePlayer(mockSupabaseClient, playerUpdateDto)

    assertEquals(result.user_id, '123')
    assertEquals(result.username, 'updatedUser')
    assertEquals(result.first_name, 'John')
    assertEquals(result.last_name, 'Doe')
})

Deno.test('updatePlayer throws an error if database update fails', async () => {
    const failingSupabaseClient = {
        from: () => ({
            update: () => ({
                eq: () => ({
                    select: () => ({
                        single: () =>
                            Promise.resolve({
                                data: null,
                                error: { message: 'Update failed' },
                            }),
                    }),
                }),
            }),
        }),
    } as unknown as SupabaseClient

    const playerUpdateDto: PlayerUpdateDto = {
        user_id: '123',
        username: 'updatedUser',
        first_name: 'John',
        last_name: 'Doe',
    }

    await assertRejects(
        () => updatePlayer(failingSupabaseClient, playerUpdateDto),
        Error,
        'Update failed'
    )
})
