import { corsHeaders } from '../_shared/utils/cors.ts'
import { createErrorResponse } from '../_shared/response.ts'
import { createSupabaseClient } from '../_shared/supabaseClient.ts'
import { PlayerCreateDto, PlayerUpdateDto } from '../_shared/types/player.ts'
import {
    createPlayer,
    getPlayerByUserId,
    updatePlayer,
} from './repositories/playerRepository.ts'

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

    const player = await getPlayerByUserId(createSupabaseClient('player', authHeader), userId)

    return new Response(JSON.stringify(player), { status: 200 })
}

/**
 * The endpoint to create a player.
 * @param req
 */
async function handleCreatePlayer(req: Request) {
    const playerDto: PlayerCreateDto = await req.json()

    const player = await createPlayer(createSupabaseClient('player'), playerDto)

    return new Response(JSON.stringify(player), { status: 201 })
}

/**
 * The endpoint to update a player.
 * @param req
 */
async function handleUpdatePlayer(req: Request) {
    const playerUpdateDto: PlayerUpdateDto = await req.json()

    if (!playerUpdateDto.id) {
        return createErrorResponse('Missing player id', 400)
    }

    const player = await updatePlayer(createSupabaseClient('player'), playerUpdateDto)

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
            case method === 'POST': {
                return await handleCreatePlayer(req)
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
