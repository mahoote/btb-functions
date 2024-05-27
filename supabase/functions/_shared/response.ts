import { corsHeaders } from './cors.ts'

// deno-lint-ignore no-explicit-any
function createResponse(body: any, status?: number): Response {
    return new Response(JSON.stringify(body), {
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
