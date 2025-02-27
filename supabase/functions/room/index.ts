import { corsHeaders } from '../_shared/utils/cors.ts'
import { createErrorResponse } from '../_shared/response.ts'
import { PlayerHasRoomCreateDto, RoomCreateDto } from './type/room.ts'
import { createSupabaseClient } from '../_shared/supabaseClient.ts'
import { addPlayerToRoom, createRoom } from '../player/repositories/roomRepository.ts'

/**
 * The endpoint to create a room.
 * @param req
 */
async function handleCreateRoom(req: Request) {
    const room: RoomCreateDto = await req.json()

    const authHeader = req.headers.get('Authorization')

    if (!authHeader) {
        return createErrorResponse('Unauthorized', 401)
    }

    const gameRoom = await createRoom(createSupabaseClient('player', authHeader), room)

    return new Response(JSON.stringify(gameRoom), { status: 201 })
}

async function handleAddPlayerToRoom(req: Request) {
    const playerHasRoom: PlayerHasRoomCreateDto = await req.json()

    const authHeader = req.headers.get('Authorization')

    if (!authHeader) {
        return createErrorResponse('Unauthorized', 401)
    }

    const room = await addPlayerToRoom(
        createSupabaseClient('player', authHeader),
        playerHasRoom
    )

    return new Response(JSON.stringify(room), { status: 201 })
}

Deno.serve(async (req: Request): Promise<Response> => {
    const { method, url } = req
    const urlObj = new URL(url)
    const pathname = urlObj.pathname

    if (method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        switch (true) {
            case method === 'POST' && pathname === '/room': {
                return await handleCreateRoom(req)
            }
            case method === 'POST' && pathname.startsWith('/room/player'): {
                return await handleAddPlayerToRoom(req)
            }
            default:
                return createErrorResponse('Not found', 404)
        }
    } catch (error) {
        console.error(error)
        return createErrorResponse(error.message, 400)
    }
})
