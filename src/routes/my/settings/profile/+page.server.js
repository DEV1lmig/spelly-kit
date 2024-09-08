import { error } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ locals: { user, supabase } }) => {
	if (!user) {
		redirect(303, '/login');
	}
	return { user };
}

export const actions = {
	updateProfile: async ({ request, locals: { user, supabase } }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const avatar = formData.get('avatar');
        /*https://jylljpjuknljxtgiuhgh.supabase.co/storage/v1/object/public/avatars/e1e5c7a72eeaa9bab3c2ea995527d765.jpg?t=2024-08-24T16%3A24%3A25.183Z*/
		const avatarUrl = avatar.name;
        const publicUrl = `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarUrl}`;

			const { updateData, error: updateError } = await supabase.auth.updateUser({
				data: {
					username: username,
				}
			});
            console.log(updateData);
			if (updateError) throw updateError;

			return {
				success: true,
				userName: username,
				avatarUrl: publicUrl
			}
		}
	}
