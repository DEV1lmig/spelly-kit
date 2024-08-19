import { redirect, error, fail } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { registerUserSchema } from '$lib/schemas';
import { AuthApiError } from '@supabase/supabase-js';
import toast from 'svelte-french-toast';

export const actions = {
    register: async ({ request, locals }) => {
        const { formData, errors } = await validateData(await request.formData(), registerUserSchema);
        if (errors) {
            return fail(400, {
                data: formData,
                errors: errors.fieldErrors
            });
        }

        try {
            const { user, error: signUpError } = await locals.sb.auth.signUp(
                {
                    email: formData.email,
                    password: formData.password
                },
                {
                    data: {
                        firstname: formData.firstname,
                        lastname: formData.lastname
                    }
                }
            );

            if (signUpError) {
                if (signUpError instanceof AuthApiError && signUpError.status === 400) {
                    toast.error('Invalid email or password');
                    return fail(400, {
                        error: 'Invalid email or password'
                    });
                }
                toast.error(signUpError.message);
                error(500, signUpError.message);
            }

            // Insert user into custom users table
            const { error: insertError } = await locals.sb.from('users').insert([
                {
                    id: user.id,
                    username: formData.username,
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email,
                    password: formData.password
                }
            ]);

            if (insertError) {
                toast.error(insertError.message);
                error(500, insertError.message);
            }

            toast.success('Registro exitoso! Por favor, revisa tu correo para verificar tu cuenta.');

            return {
                success: true,
                message: 'Registro exitoso! Por favor, revisa tu correo para verificar tu cuenta.'
            };
        } catch (err) {
            console.log('error', err);
            toast.error('Algo salió mal durante el proceso de registro.');
            error(500, 'Something went wrong during the registration process.');
        }
    }
};
