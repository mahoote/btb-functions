import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'

import { SupabaseResponse } from '../../_shared/types/supabaseResponse.ts'
import { Player, PlayerUpdateDto } from '../../_shared/types/player.ts'

/**
 * Updates a player by user_id.
 * @param supabase
 * @param playerUpdateDto
 */
export async function updatePlayer(
    supabase: SupabaseClient,
    playerUpdateDto: PlayerUpdateDto
) {
    const { data, error }: SupabaseResponse<Player> = await supabase
        .from('player')
        .update({
            updated_at: new Date().toISOString(),
            username: playerUpdateDto.username,
            first_name: playerUpdateDto.firstName,
            last_name: playerUpdateDto.lastName,
        })
        .eq('user_id', playerUpdateDto.userId)
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
