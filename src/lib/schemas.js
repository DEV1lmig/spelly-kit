import { z } from 'zod';

export const loginUserSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email.' }),
	password: z.string({ required_error: 'Password is required' })
});

export const registerUserSchema = z
	.object({
		firstname: z
			.string({ required_error: 'El nombre es requerido' })
			.regex(/^[a-zA-z\s]*$/, { message: 'Nombre solo puede contener letras' })
			.min(2, { message: 'Tu nombre tiene que tener como minimo 2 caracteres' })
			.max(64, { message: 'Tu nombre tiene que tener menos de 64 caracteres' })
			.trim(),
		lastname: z
			.string({ required_error: 'El apellido es requerido' })
			.regex(/^[a-zA-z\s]*$/, { message: 'apellido solo puede contener letras' })
			.min(2, { message: 'Tu apellido tiene que tener como minimo 2 caracteres' })
			.max(64, { message: 'Tu apellido tiene que tener menos de 64 caracteres' })
			.trim(),
		email: z
			.string({ required_error: 'El correo es requerido' })
			.email({ message: 'Debe introducir un correo valido' }),
		password: z
			.string({ required_error: 'La contraseña es requerida' })
			.regex(/^(?=.*[A-Z])(?=.*[.!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8,}$/, {
				message:
					'La contraseña debe tener un mínimo de 8 caracteres y contener al menos una letra mayuscula, dos números y un carácter especial'
			}),
		passwordConfirm: z
			.string({ required_error: 'La contraseña es requerida' })
			.regex(/^(?=.*[A-Z])(?=.*[.!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8,}$/, {
				message:
					'La contraseña debe tener un mínimo de 8 caracteres y contener al menos una letra, un número y un carácter especial.'
			}),
    username: z
      .string()
			.min(5, { message: 'Tu nombre de usuario tiene que tener como minimo 5 caracteres' })
			.max(17, { message: 'Tu nombre de usuario tiene que tener menos de 17 caracteres' })
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'La contraseña y la confirmacion deben coincidir',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'La contraseña y la confirmacion deben coincidir',
				path: ['passwordConfirm']
			});
		}
	});
