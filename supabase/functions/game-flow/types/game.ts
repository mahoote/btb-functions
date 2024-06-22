type Game = {
    id: number
    created_at: string
    min_players: number
    max_players?: number
    activity_level?: number
    drunk_level?: number
    minutes?: number
    game_type_id: number
    player_group_type_id?: number
    game_category_id: number
    descriptions: string[]
    intro_description?: string
    name: string
    game_audience_id?: number
}

type GameCategory = {
    id: number
    name: string
}

type GameHasAccessory = {
    id: number
    accessory_id: number
    game_id: number
}

type GameDto = {
    id: number
    name: string
    intro_description?: string
    descriptions: string[]
    min_players: number
    max_players?: number
    activity_level?: number
    drunk_level?: number
    minutes?: number
    game_type_id: number
    player_group_type_id?: number
    game_audience_id?: number
    game_category: GameCategory
    game_has_accessory: GameHasAccessory[]
    created_at: string
}

export type { Game, GameDto }
