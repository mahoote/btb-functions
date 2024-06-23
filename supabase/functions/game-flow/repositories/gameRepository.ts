import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import { IGameRepository } from '../interfaces/IRepository.ts'
import { GameDto } from '../types/game.ts'
import {
    AccessoryEnum,
    ActivityEnum,
    DrunkEnum,
    GameAudienceEnum,
    GameCategoryEnum,
} from '../types/gameEnum.ts'

export default class GameRepository implements IGameRepository {
    constructor(private supabaseClient: SupabaseClient) {}

    /**
     * Fetch a game from the database that matches the given criteria.
     * Finally, filters the games by accessory and returns a random game
     * @param category
     * @param accessories
     * @param audience
     * @param drunkLevel
     * @param activityLevel
     * @param maxMinutes
     */
    public async fetchGame(
        category: GameCategoryEnum,
        accessories: AccessoryEnum[],
        audience?: GameAudienceEnum,
        drunkLevel?: DrunkEnum,
        activityLevel?: ActivityEnum,
        maxMinutes?: number
    ): Promise<GameDto> {
        let query = this.supabaseClient
            .from('game')
            .select(
                `*,
                    game_category(*),
                    accessories: game_has_accessory!left (id:accessory_id)
                  `
            )
            .eq('game_category_id', category)
            .is('game_audience_id', audience ?? null)
            .eq('drunk_level', drunkLevel ?? 1)
            .eq('activity_level', activityLevel ?? 1)

        if (maxMinutes) {
            query = query.lte('minutes', maxMinutes)
        }

        const { data, error } = await query

        if (error) {
            throw new Error(error.message || 'Unknown database error')
        }

        const games = data as GameDto[]

        const accessoryFilteredGames: GameDto[] = games.filter(game => {
            return game.accessories.every(gameAccessory =>
                accessories.includes(gameAccessory.id)
            )
        })

        const randomIndex = Math.floor(Math.random() * accessoryFilteredGames.length)

        return accessoryFilteredGames[randomIndex]
    }
}
