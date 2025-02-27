import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import { Room, RoomCreateDto } from '../../room/type/room.ts'
import { SupabaseResponse } from '../../_shared/types/supabaseResponse.ts'

/**
 * Creates a room.
 * @param supabase
 * @param name
 * @param maxPlayers
 */
export async function createRoom(
    supabase: SupabaseClient,
    { name, maxPlayers }: RoomCreateDto
) {
    const { data, error }: SupabaseResponse<Room> = await supabase
        .from('room')
        .insert({
            name,
            max_players: maxPlayers,
        })
        .select()
        .single()

    if (error) {
        throw new Error(error.message || 'Unknown database error')
    }

    if (!data) {
        throw new Error('Error creating game room')
    }

    return data
}
