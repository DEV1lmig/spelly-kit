import { PUBLIC_SUPABASE_KEY, PUBLIC_URL_SUPABASE } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'

export const load = async ({ fetch, data, depends }) => {
    depends('supabase:auth')

    const supabase = createSupabaseLoadClient({
        supabaseUrl: PUBLIC_URL_SUPABASE,
        supabaseKey: PUBLIC_SUPABASE_KEY,
        event: { fetch },
        serverSession: data.session,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return { supabase, session }
}