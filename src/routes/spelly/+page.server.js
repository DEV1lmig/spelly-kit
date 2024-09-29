/** @type {import('./$types').PageServerLoad} */
import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({ locals }) {
	if (!locals.userPb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getUsersCorrections = async (userId) => {
		try {
			const text = serializeNonPOJOs(
				await locals.userPb.collection('corrections').getFullList(undefined, {
					filter: `user = "${userId}"`
				})
			);
			return text;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};
	return {
		corrections: getUsersCorrections(locals.user.id)
	};
}

export const actions = {
	saveCorrection: async ({ request, locals }) => {
		const formData = await request.formData();
		const correctedResponse = formData.get('correctionResponse');

		const dataToSave = {
			text: correctedResponse,
			user: locals.user.id
		};

		try {
			await locals.userPb.collection('corrections').create(dataToSave);
		} catch (err) {
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	}
};
