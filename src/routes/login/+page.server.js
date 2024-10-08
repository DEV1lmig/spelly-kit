import { error, fail, redirect } from "@sveltejs/kit";
import { validateData } from "$lib/utils";
import { loginUserSchema } from "$lib/schemas";

export const actions = {
	login: async ({ request, locals }) => {
		const { formData, errors } = await validateData(
			await request.formData(),
			loginUserSchema,
		);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
			});
		}

		try {
			await locals.userPb
				.collection("users")
				.authWithPassword(formData.email, formData.password);
			if (!locals.userPb?.authStore?.model?.verified) {
				locals.userPb.authStore.clear();
				return {
					notVerified: true,
				};
			}
		} catch (err) {
			console.log("Error: ", err);
			throw error(err.status, err.message);
		}

		throw redirect(303, "/");
	},
};