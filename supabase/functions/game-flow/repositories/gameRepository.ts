import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import { IGameRepository } from '../interfaces/IRepository.ts'
import { Game } from '../types/game.ts'

export default class GameRepository implements IGameRepository {
    constructor(private supabaseClient: SupabaseClient) {}

    async fetchGame(): Promise<Game> {
        const { data, error } = await this.supabaseClient
            .from('game')
            .select('*')
            .limit(1)
            .single()

        if (error) {
            throw new Error(error.message || 'Unknown database error')
        }

        return data as Game
    }
}
