import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function load({ locals }) {
    // Sign out the user from Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log('Error signing out: ', error);
    }

    // Clear the user from locals
    locals.user = null;

    redirect(303, '/login');
}