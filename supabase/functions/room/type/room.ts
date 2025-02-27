export interface Room {
    id: number
    name: string
    max_players?: number
    created_at: string
    deleted_at?: string
}

export interface PlayerHasRoom {
    id: number
    is_host: boolean
    created_at: string
    room_id: number
    player_id: string
}

export interface RoomCreateDto {
    name: string
    maxPlayers?: number
}

export interface PlayerHasRoomCreateDto {
    playerId: string
    roomId: number
    isHost?: boolean
}
