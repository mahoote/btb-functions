import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

declare global {
    var supabaseClient: SupabaseClient
}

export {}
