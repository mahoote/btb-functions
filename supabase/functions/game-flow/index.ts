import { corsHeaders } from '../_shared/utils/cors.ts'
import { createErrorResponse } from '../_shared/response.ts'
import { GamePreferences } from './types/gamePreferences.ts'
import createGameFlow from './services/create.ts'

Deno.serve(async (req): Promise<Response> => {
    const { method } = req

    if (method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const json = await req.json()

        switch (true) {
            case method === 'POST':
                return createGameFlow(json as GamePreferences)
            default:
                return createErrorResponse('Not found', 404)
        }
    } catch (error) {
        console.error(error)
        return createErrorResponse(error.message, 400)
    }
})
