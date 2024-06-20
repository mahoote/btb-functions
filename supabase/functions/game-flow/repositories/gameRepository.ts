import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import { IGameRepository } from '../interfaces/IRepository.ts'
import { Game } from '../types/game.ts'
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
    ): Promise<Game> {
        const { data, error } = await this.supabaseClient
            .from('random_game')
            .select('*')
            .eq('game_category_id', category)
            .is('game_audience_id', audience ?? null)
            .eq('drunk_level', drunkLevel ?? 1)
            .eq('activity_level', activityLevel ?? 1)
            .limit(1)
            .single()

        if (error) {
            throw new Error(error.message || 'Unknown database error')
        }

        return data as Game
    }
}
