import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { loginUserSchema } from '$lib/schemas';

const OAUTH_PROVIDERS = ['google', 'discord', 'github'];

export const actions = {
	login: async ({ request, locals, url }) => {
		const provider = url.searchParams.get('provider');

		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, {
					error: 'Provider not supported.'
				});
			}
			const { data, error: err } = await locals.sb.auth.signInWithOAuth({
				provider: provider
			});

			if (err) {
				console.log(err);
				return fail(400, {
					message: 'Something went wrong.'
				});
			}

			redirect(303, data.url);
		}

		const { formData, errors } = await validateData(await request.formData(), loginUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const { user, error: signInError } = await locals.sb.auth.signInWithPassword({
				email: formData.email,
				password: formData.password
			});

			if (signInError) {
				if (signInError instanceof AuthApiError && signInError.status === 400) {
					return fail(400, {
						error: 'Invalid credentials'
					});
				}
				return fail(500, {
					message: 'Server error. Try again later.'
				});
			}

			redirect(303, '/');
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status || 500, err.message);
		}
	}
};
