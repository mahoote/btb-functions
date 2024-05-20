import { PlayerPreference } from '../_types/gamePreferences.ts'
import calculateAverages from '../_utils/calculateAverages.ts'

Deno.serve(async (req) => {
    const preferences: PlayerPreference[] = await req.json()

    if (!preferences || !Array.isArray(preferences)) {
        return new Response(JSON.stringify('Incorrect format!'), {
            headers: { 'Content-Type': 'application/json' },
            status: 400,
        })
    }

    const averages = calculateAverages(preferences)

    return new Response(JSON.stringify(averages), {
        headers: { 'Content-Type': 'application/json' },
    })
})
