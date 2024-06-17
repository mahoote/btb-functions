import { Challenge } from '../types/challenge.ts'
import { IChallengeRepository } from '../interfaces/IRepository.ts'
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

export default class ChallengeRepository implements IChallengeRepository {
    constructor(private supabaseClient: SupabaseClient) {}

    public async fetchRandomChallenge(): Promise<Challenge> {
        const { data, error } = await this.supabaseClient
            .from('random_challenge')
            .select('*')
            .limit(1)
            .single()

        if (error) {
            throw error
        }

        return data as Challenge
    }
}
