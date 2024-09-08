import { redirect } from '@sveltejs/kit';

export async function load({ locals: { supabase, safeGetSession } }) {
	const { session } = await safeGetSession();

	if (session) {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.log('Error signing out: ', error);
		} else {
			redirect(303, '/login');
		}
	}
}
