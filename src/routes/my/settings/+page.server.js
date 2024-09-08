import { redirect } from '@sveltejs/kit';

export const load = ({ locals: { user } }) => {
	if (!user) {
		redirect(303, '/login');
	} else {
		redirect(303, '/my/settings/profile');
	}
};
