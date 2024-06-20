type Game = {
    id: number
    created_at: string
    min_players: number
    max_players?: number
    activity_level?: number
    alcohol_level?: number
    minutes?: number
    game_type_id: number
    player_group_type_id?: number
    game_category_id: number
    descriptions: string[]
    intro_description?: string
    name: string
    game_audience_id?: number
}

export type { Game }
