/** @type {import('./$types').PageServerLoad} */
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.userPb.authStore.isValid){
        redirect(303, '/login');
    }
};

export const actions = {
    saveCorrection: async ({ request, locals }) => {
        const formData = await request.formData()
        
        console.log(formData)

        formData.append('user', locals.user.id)
        try {
            await locals.userPb.collection('corrections').create(formData)
        } catch (err) {
            console.log('Error:', err)
            error(err.status, err.message);
        }   
    }
}