import { corsHeaders } from '../_shared/utils/cors.ts'
import { createErrorResponse } from '../_shared/response.ts'
import { createSupabaseClient } from '../_shared/supabaseClient.ts'
import { PlayerUpdateDto } from '../_shared/types/player.ts'
import { getPlayer, updatePlayer } from './repositories/playerRepository.ts'

/**
 * The endpoint to get a player.
 * @param req
 */
async function handleGetPlayer(req: Request) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('user_id')

    if (!userId) {
        return createErrorResponse('Missing user_id', 400)
    }

    const authHeader = req.headers.get('Authorization')

    if (!authHeader) {
        return createErrorResponse('Unauthorized', 401)
    }

    const player = await getPlayer(createSupabaseClient('player', authHeader), userId)

    return new Response(JSON.stringify(player), { status: 200 })
}

/**
 * The endpoint to update a player.
 * @param req
 */
async function handleUpdatePlayer(req: Request) {
    const playerUpdateDto: PlayerUpdateDto = await req.json()

    const authHeader = req.headers.get('Authorization')

    if (!authHeader) {
        return createErrorResponse('Unauthorized', 401)
    }

    const player = await updatePlayer(
        createSupabaseClient('player', authHeader),
        playerUpdateDto
    )

    return new Response(JSON.stringify(player), { status: 200 })
}

Deno.serve(async (req: Request): Promise<Response> => {
    const { method } = req

    if (method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        switch (true) {
            case method === 'GET': {
                return await handleGetPlayer(req)
            }
            case method === 'PUT': {
                return await handleUpdatePlayer(req)
            }
            default:
                return createErrorResponse('Not found', 404)
        }
    } catch (error) {
        console.error(error)
        return createErrorResponse(error.message, 400)
    }
})
