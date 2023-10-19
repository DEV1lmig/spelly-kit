import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    if(!locals.userPb.authStore.isValid) throw redirect(303, '/landingpage')
    if(locals.userPb.authStore.isValid) throw redirect(303, '/spelly')
};