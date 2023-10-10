import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { sb, getSession } }) {
    const session = await getSession()
    if(session){
        await sb.auth.signOut()
        throw redirect(303, '/login')
    }
};