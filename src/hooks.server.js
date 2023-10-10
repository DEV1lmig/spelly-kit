import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { PUBLIC_URL_SUPABASE, PUBLIC_SUPABASE_KEY } from '$env/static/public'

export const handle = async ({ event, resolve }) => {
  event.locals.sb = createSupabaseServerClient ({
    supabaseUrl: PUBLIC_URL_SUPABASE,
    supabaseKey: PUBLIC_SUPABASE_KEY,
    event,
  })
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.sb.auth.getSession()
    return session
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    }
  })
}