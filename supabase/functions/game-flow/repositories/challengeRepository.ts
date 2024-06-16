import { supabaseClient } from '../../_shared/supabaseClient.ts'
import { Challenge } from '../types/challenge.ts'

async function fetchRandomChallenge(): Promise<Challenge> {
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

export { fetchRandomChallenge }
