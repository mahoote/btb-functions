import { Challenge } from '../types/challenge.ts'
import { IChallengeRepository } from '../interfaces/IRepository.ts'
import { supabaseClient } from '../../_shared/supabaseClient.ts'

export default class ChallengeRepository implements IChallengeRepository {
    public async fetchRandomChallenge(): Promise<Challenge> {
        const { data, error } = await supabaseClient
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
