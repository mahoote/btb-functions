export interface Room {
    id: string
    name: string
    max_players?: number
    created_at: string
    deleted_at?: string
}

export interface RoomCreateDto {
    name: string
    maxPlayers?: number
}
