import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import { PostgrestError } from 'https://esm.sh/v135/@supabase/postgrest-js@1.8.6/dist/module/types.d.ts'

import { Challenge } from '../types/challenge.ts'
import { IChallengeRepository } from '../interfaces/IRepository.ts'

export default class ChallengeRepository implements IChallengeRepository {
    constructor(private supabaseClient: SupabaseClient) {}

    public async fetchRandomChallenge(): Promise<Challenge> {
        const maxRetries = 3
        let failedAttempts = 0

        let data: Challenge | null = null
        let error: PostgrestError | null = null

        while (failedAttempts < maxRetries) {
            const response = await this.supabaseClient
                .from('random_challenge')
                .select('*')
                .limit(1)
                .single()

            data = response.data
            error = response.error

            if (!error) {
                break
            }

            console.error('Supabase query error:', error)
            failedAttempts++
        }

        if (error) {
            throw new Error(
                `Challenge Repository: ${error.message}` || 'Unknown database error'
            )
        }

        return data as Challenge
    }
}
