import { supabaseClient } from '../../_shared/supabaseClient.ts'

const fetchRandomChallenge = async () => {
    const { data, error } = await supabaseClient
        .from('randomChallenge')
        .select('*')
        .limit(1)
        .single()

    if (error) {
        throw error
    }

    return data as string
}

export { fetchRandomChallenge }
