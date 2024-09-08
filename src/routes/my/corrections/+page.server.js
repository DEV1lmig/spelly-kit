import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals: { user, supabase } }) => {
	if (!user) {
		redirect(303, '/login');
	}

	const getUsersCorrections = async (userId) => {
		try {
			const { corrections, fetchError } = await supabase
				.from('corrections')
				.select('*')
				.eq('user', userId);

			if (fetchError) {
				throw fetchError;
			}

			return serializeNonPOJOs(corrections);
		} catch (err) {
			console.log('Error: ', err);
			error(err.status, err.message);
		}
	};

	return {
		corrections: getUsersCorrections(user)
	};
};

export const actions = {
	deleteProject: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			const { deleteError } = await supabase.from('corrections').delete().eq('id', id);

			if (deleteError) {
				throw deleteError;
			}
		} catch (err) {
			console.log('Error: ', err);
			error(err.status, err.message);
		}

		return {
			success: true
		};
	}
};
