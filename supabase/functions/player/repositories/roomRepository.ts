import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import {
    PlayerHasRoom,
    PlayerHasRoomCreateDto,
    Room,
    RoomCreateDto,
} from '../../room/type/room.ts'
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

/**
 * Adds a player to a room.
 * @param supabase
 * @param playerHasRoom
 */
export async function addPlayerToRoom(
    supabase: SupabaseClient,
    playerHasRoom: PlayerHasRoomCreateDto
) {
    const { data, error }: SupabaseResponse<PlayerHasRoom> = await supabase
        .from('player_has_room')
        .insert({
            player_id: playerHasRoom.playerId,
            room_id: playerHasRoom.roomId,
            is_host: playerHasRoom.isHost,
        })
        .select()
        .single()

    if (error) {
        throw new Error(error.message || 'Unknown database error')
    }

    if (!data) {
        throw new Error('Error adding player to room')
    }

    return data
}
