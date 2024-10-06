type GameCategory = {
    id: number
    name: string
}

type GameDto = {
    id: number
    name: string
    intro_description?: string
    descriptions: string[]
    min_players?: number
    max_players?: number
    activity_level?: number
    drunk_level?: number
    minutes: number
    game_types: { id: number }[]
    player_group_type_id?: number
    game_audience_id?: number
    game_category: GameCategory
    accessories: { id: number }[]
    created_at: string
}

export type { GameDto }
