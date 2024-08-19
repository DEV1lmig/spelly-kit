/** @type {import('./$types').PageServerLoad} */

import { redirect } from '@sveltejs/kit';

export const actions={
    verification: async ({ locals }) => {
        const email = locals.userPb.authStore.model.email;
        const res = await locals.userPb.collection('users').requestVerification(email)
        
        if(res) redirect(303, '/login');
    }
}