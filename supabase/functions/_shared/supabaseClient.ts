import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'

type SupabaseSchema = 'game' | 'player'

/**
 * Create a Supabase client with the given schema and authorization.
 * @param schema
 * @param authorization
 */
export const createSupabaseClient = (schema: SupabaseSchema, authorization?: string) => {
    // deno-lint-ignore no-explicit-any
    const options: any = {
        db: { schema },
    }

    if (authorization) {
        options.global = {
            headers: {
                Authorization: authorization,
            },
        }
    }

    return createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        options
    )
}
