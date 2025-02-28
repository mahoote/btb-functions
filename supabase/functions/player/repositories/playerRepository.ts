import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'

import { SupabaseResponse } from '../../_shared/types/supabaseResponse.ts'
import { Player, PlayerCreateDto, PlayerUpdateDto } from '../../_shared/types/player.ts'

/**
 * Gets a player by id.
 * @param supabase
 * @param id
 */
export async function getPlayer(supabase: SupabaseClient, id: string) {
    const { data, error }: SupabaseResponse<Player> = await supabase
        .from('player')
        .select()
        .eq('id', id)
        .single()

    if (error) {
        throw new Error(error.message || 'Unknown database error')
    }

    if (!data) {
        throw new Error('Error returning player')
    }

    return data
}

/**
 * Gets a player by user_id.
 * @param supabase
 * @param userId
 */
export async function getPlayerByUserId(supabase: SupabaseClient, userId: string) {
    const { data, error }: SupabaseResponse<Player> = await supabase
        .from('player')
        .select()
        .eq('user_id', userId)
        .single()

    if (error) {
        throw new Error(error.message || 'Unknown database error')
    }

    if (!data) {
        throw new Error('Error returning player')
    }

    return data
}

/**
 * Creates a player.
 * @param supabase
 * @param playerDto
 */
export async function createPlayer(supabase: SupabaseClient, playerDto: PlayerCreateDto) {
    const { data, error }: SupabaseResponse<Player> = await supabase
        .from('player')
        .insert([
            {
                user_id: playerDto.userId,
                username: playerDto.username,
                first_name: playerDto.firstName,
                last_name: playerDto.lastName,
                is_guest: playerDto.isGuest ?? false,
            },
        ])
        .select()
        .single()

    if (error) {
        throw new Error(error.message || 'Unknown database error')
    }

    if (!data) {
        throw new Error('Error creating player')
    }

    return data
}

/**
 * Updates a player by id.
 * @param supabase
 * @param playerUpdateDto
 */
export async function updatePlayer(
    supabase: SupabaseClient,
    playerUpdateDto: PlayerUpdateDto
) {
    const existingPlayer = await getPlayer(supabase, playerUpdateDto.id ?? '')

    const { data, error }: SupabaseResponse<Player> = await supabase
        .from('player')
        .update({
            updated_at: new Date().toISOString(),
            username: playerUpdateDto.username ?? existingPlayer.username,
            first_name: playerUpdateDto.firstName ?? existingPlayer.first_name,
            last_name: playerUpdateDto.lastName ?? existingPlayer.last_name,
            is_guest: playerUpdateDto.isGuest ?? existingPlayer.is_guest,
            deleted_at: playerUpdateDto.deletedAt ?? existingPlayer.deleted_at,
        })
        .eq('id', playerUpdateDto.id)
        .select()
        .single()

    if (error) {
        throw new Error(error.message || 'Unknown database error')
    }

    if (!data) {
        throw new Error('Error returning updated player')
    }

    return data
}
