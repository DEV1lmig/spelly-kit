// src/routes/auth/callback/+server.js
import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { sb } }) => {
  const code = url.searchParams.get('code')

  if (code) {
    await sb.auth.exchangeCodeForSession(code)
  }

  throw redirect(303, '/spelly')
}