import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const actions = {
    updateProfile: async ({ request, locals }) => {
        let data = await request.formData();
        const userAvatar = data.get('avatar');

        if (userAvatar.size === 0) {
            data.delete('avatar');
        }

				const updates = {
					id: locals?.user?.id,
					username: data.get('username')
			};
			
			try {
					if (userAvatar.size > 0) {
							const { data: storageData, error: storageError } = await supabase
									.storage
									.from('avatars')
									.upload(`public/${locals.user.id}/${userAvatar.name}`, userAvatar, {
											cacheControl: '3600',
											upsert: true
									});
			
							if (storageError) {
									throw storageError;
							}
			
							const avatarUrl = supabase.storage.from('avatars').getPublicUrl(storageData.path).publicURL;
							updates.avatar_url = avatarUrl;
					}
			
					const { data: updatedUser, error: updateError } = await supabase
							.from('users')
							.update(updates)
							.eq('id', locals?.user?.id)
							.single();
			
					if (updateError) {
							throw updateError;
					}
			
					locals.user.username = updatedUser.username;
					locals.user.avatar_url = updatedUser.avatar_url;
			} catch (err) {
					console.log('Error: ', err);
			
					error(400, 'Something went wrong updating your profile');
			}
			
			return {
					success: true
			};
    }
};