import { redirect, error, fail } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { registerUserSchema } from '$lib/schemas';
import { AuthApiError } from '@supabase/supabase-js';
import toast from 'svelte-french-toast';

export const actions = {
	register: async ({ request, locals: { supabase } }) => {
		const { formData, errors } = await validateData(await request.formData(), registerUserSchema);
		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}
		const email = formData.email;
		const password = formData.password;
        const firstname = formData.firstname
        const lastname = formData.lastname
        const username = formData.username

		try {
			const { error } = await supabase.auth.signUp({
				email,
				password,
                options: {
                    data: {
                        firstname: firstname,
                        lastname: lastname,
                        username: username
                    }
                }
			});

			if (error) {
				console.log('signUpError', error.message);
				if (error instanceof AuthApiError && error.status === 400) {
					toast.error('Email o contraseña inválidos.');
					return fail(400, {
						error: 'Email o contraseña inválidos.'
					});
				}
				redirect(303, '/auth/error');
			}

			return {
				success: true,
				message: 'Registro exitoso! Por favor, revisa tu correo para verificar tu cuenta.'
			};
		} catch (err) {
			console.log('error', err);
			error(500, 'Algo salió mal durante el proceso de registro.');
		}
	}
};
