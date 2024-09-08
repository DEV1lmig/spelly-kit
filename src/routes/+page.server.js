import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.safeGetSession()) {
		redirect(303, '/login');
	} else {
		redirect(303, '/landingpage');
	}
};
