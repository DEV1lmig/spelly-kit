import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.userPb.authStore.isValid) {
		redirect(303, '/login');
	}
};