import { supabaseClient } from '../../_shared/supabaseClient.ts'
import { Player } from '../types/player.ts'

async function fetchPlayers() {
    const { data, error } = await supabaseClient.from('player').select('*')

    // TODO: Add error handling.
    if (error) {
        console.log(error)
        return []
    }

    return data as Player[]
}

export { fetchPlayers }
