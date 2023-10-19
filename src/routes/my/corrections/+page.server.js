import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ( {locals} ) => {
    if (!locals.userPb.authStore.isValid) {
        throw redirect(303, '/login');
    }

    const getUsersCorrections = async (userId) => {
        try{
            const todos = serializeNonPOJOs(await locals.userPb.collection('corrections').getFullList(undefined, {
                filter: `user = "${userId}"`
            }))
            return todos
        } catch(err){
            console.log('Error: ', err);
            throw error(err.status, err.message);
        }
    }
    return {
        corrections: getUsersCorrections(locals.user.id)
    }
}

export const actions = {
	deleteProject: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			await locals.userPb.collection('corrections').delete(id);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};