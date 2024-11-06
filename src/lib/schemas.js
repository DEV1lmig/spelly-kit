import { z } from 'zod';

export const loginUserSchema = z.object({
    email: z
      .string({ required_error: 'errors.email.required' })
      .email({ message: 'errors.email.invalid' }),
    password: z.string({ required_error: 'errors.password.required' })
  });

  export const registerUserSchema = z
    .object({
      firstname: z
        .string({ required_error: 'errors.firstname.required' })
        .regex(/^[a-zA-z\s]*$/, { message: 'errors.firstname.letters' })
        .min(2, { message: 'errors.firstname.tooShort' })
        .max(64, { message: 'errors.firstname.tooLong' })
        .trim(),
      lastname: z
        .string({ required_error: 'errors.lastname.required' })
        .regex(/^[a-zA-z\s]*$/, { message: 'errors.lastname.letters' })
        .min(2, { message: 'errors.lastname.tooShort' })
        .max(64, { message: 'errors.lastname.tooLong' })
        .trim(),
      email: z
        .string({ required_error: 'errors.email.required' })
        .email({ message: 'errors.email.invalid' }),
      password: z
        .string({ required_error: 'errors.password.required' })
        .regex(/^(?=.*[A-Z])(?=.*[.!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8,}$/, {
          message: 'errors.password.requirements'
        }),
      passwordConfirm: z
        .string({ required_error: 'errors.passwordConfirm.required' })
        .regex(/^(?=.*[A-Z])(?=.*[.!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8,}$/, {
          message: 'errors.password.requirements'
        }),
    username: z
      .string()
			.min(5, { message: 'errors.username.minLength' })
			.max(17, { message: 'errors.username.maxLength' })
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'errors.password.match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'errors.password.match',
				path: ['passwordConfirm']
			});
		}
	});
