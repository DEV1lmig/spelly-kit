import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase }, event }) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/';

	console.log(code);
	console.log(next);
	// exchange the code for a session
	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		console.log(error);
		if (!error) {
			throw redirect(303, `/${next.slice(1)}`);
		}
	}
	// return the user to an error page with instructions
	throw redirect(303, '/auth/error');
};
