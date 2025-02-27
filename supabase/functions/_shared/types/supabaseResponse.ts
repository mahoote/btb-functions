import { PostgrestError } from 'https://esm.sh/v135/@supabase/postgrest-js@1.8.6/dist/module/types.d.ts'

export type SupabaseResponse<T> = {
    data: T | null
    error: PostgrestError | null
}
