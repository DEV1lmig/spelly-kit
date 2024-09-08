import { serializeNonPOJOs } from '../lib/utils';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ locals: { safeGetSession, supabase, user, }, cookies }) => {
	const { session } = await safeGetSession();

    return {
		session,
        user,
		cookies: cookies.getAll()
	};
};
