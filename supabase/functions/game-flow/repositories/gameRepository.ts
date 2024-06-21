import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import { IGameRepository } from '../interfaces/IRepository.ts'
import { Game, GameDto } from '../types/game.ts'
import {
    AccessoryEnum,
    ActivityEnum,
    DrunkEnum,
    GameAudienceEnum,
    GameCategoryEnum,
} from '../types/gameEnum.ts'

export default class GameRepository implements IGameRepository {
    constructor(private supabaseClient: SupabaseClient) {}

    public async fetchGame(
        category: GameCategoryEnum,
        accessories: AccessoryEnum[],
        audience?: GameAudienceEnum,
        drunkLevel?: DrunkEnum,
        activityLevel?: ActivityEnum
    ): Promise<GameDto> {
        const { data, error } = await this.supabaseClient
            .from('game')
            .select(
                `*,
                    game_category(*),
                    game_has_accessory(*)`
            )
            .eq('game_category_id', category)
            .is('game_audience_id', audience ?? null)
            .eq('drunk_level', drunkLevel ?? 1)
            .eq('activity_level', activityLevel ?? 1)

        if (error) {
            throw new Error(error.message || 'Unknown database error')
        }

        const games = data as GameDto[]

        const accessoryFilteredGames = games.filter(game => {
            return game.game_has_accessory.every(gameAccessory =>
                accessories.includes(gameAccessory.accessory_id)
            )
        })

        const randomIndex = Math.floor(Math.random() * accessoryFilteredGames.length)

        return accessoryFilteredGames[randomIndex]
    }
}
