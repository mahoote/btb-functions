import { corsHeaders } from '../_shared/cors.ts'
import { createErrorResponse } from '../_shared/response.ts'
import { PlayerPreference } from '../_types/gamePreferences.ts'
import createGame from './create.ts'

Deno.serve(async (req): Promise<Response> => {
    const { method } = req

    if (method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const json = await req.json()

        switch (true) {
            case method === 'POST':
                return createGame(json as PlayerPreference[])
            default:
                return createErrorResponse('Not found', 404)
        }
    } catch (error) {
        console.error(error)
        return createErrorResponse(error.message, 400)
    }
})
