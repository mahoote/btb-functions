import { corsHeaders } from './utils/cors.ts'

function createResponse(body: string, status?: number): Response {
    return new Response(body, {
        headers: { 'Content-Type': 'application/json', ...(corsHeaders || {}) },
        status: status || 200,
    })
}

function createErrorResponse(message: string, status: number): Response {
    return new Response(JSON.stringify({ error: message }), {
        headers: { 'Content-Type': 'application/json', ...(corsHeaders || {}) },
        status: status,
    })
}

export { createResponse, createErrorResponse }
