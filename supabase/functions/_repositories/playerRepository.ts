import { supabaseClient } from '../_utils/supabaseClient.ts'
import { Player } from '../_types/player.ts'

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
