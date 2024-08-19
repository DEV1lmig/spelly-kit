import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { supabase } from '$lib/supabaseClient';

export const load = ({ locals }) => {
    if (!locals.user) {
        redirect(303, '/login');
    }

    const getUsersCorrections = async (userId) => {
        try {
            const { data: todos, error: fetchError } = await supabase
                .from('corrections')
                .select('*')
                .eq('user', userId);

            if (fetchError) {
                throw fetchError;
            }

            return serializeNonPOJOs(todos);
        } catch (err) {
            console.log('Error: ', err);
            error(err.status, err.message);
        }
    };

    return {
        corrections: getUsersCorrections(locals.user.id)
    };
};

export const actions = {
    deleteProject: async ({ request, locals }) => {
        const { id } = Object.fromEntries(await request.formData());

        try {
            const { error: deleteError } = await supabase
                .from('corrections')
                .delete()
                .eq('id', id);

            if (deleteError) {
                throw deleteError;
            }
        } catch (err) {
            console.log('Error: ', err);
            error(err.status, err.message);
        }

        return {
            success: true
        };
    }
};