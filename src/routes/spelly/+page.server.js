/** @type {import('./$types').PageServerLoad} */
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals: user }) {
    if (!user){
        redirect(303, '/login');
    }
};

export const actions = {
    saveCorrection: async ({ request, locals: { user, supabase } }) => {
        const formData = await request.formData()
        const content = formData.get('content')
        console.log(formData)


        const { error } = await supabase.from('corrections').inser({
            content, user: user.id
        })

        if (error){
            console.log('Error saving correction: ', error)
            error(error.status, error.message)
        }
    }
}
