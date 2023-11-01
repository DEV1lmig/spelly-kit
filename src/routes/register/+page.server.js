/* eslint-disable no-unsafe-finally */
/* eslint-disable no-undef */
import { redirect, error, fail } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { registerUserSchema } from '$lib/schemas';

export const actions = {
	register: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), registerUserSchema);
		let createResult = false
		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			//create the user
			const result = await locals.userPb.collection('users').create(formData);
			//console.log('result',result);
			if (result) createResult = true;
		} catch (err) {
			console.log('error', err);
			throw error(500, 'Algo fue mal durante la ejecucion');
		} finally {
			if (createResult) throw redirect(303, '/login');
		}
	}
};
