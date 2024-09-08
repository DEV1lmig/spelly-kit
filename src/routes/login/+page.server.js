import { AuthApiError } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { loginUserSchema } from '$lib/schemas';

const OAUTH_PROVIDERS = ['google', 'discord', 'github'];

export const actions = {
	login: async ({ request, locals: { supabase }, url }) => {
		const provider = url.searchParams.get('provider');

		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return error(400, {
					error: 'Provider not supported.'
				});
			}
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider,
				options: {
					redirectTo: 'http://localhost:5173/auth/callback'
				}
			});

			if (error) {
				console.log(error);
				return error(400, {
					message: 'Something went wrong.'
				});
			}else{
                redirect(303, data.url);
            }

		}

		const { formData, errors } = await validateData(await request.formData(), loginUserSchema);

		if (errors) {
			return error(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const { user, error } = await supabase.auth.signInWithPassword({
				email: formData.email,
				password: formData.password
			});

			if (error) {
                console.log(error);
			} else {
				redirect(303, '/spelly');
			}
		} catch (error) {
			console.log('Error: ', error);
		}
	}
};
