<script>
	import Input from '../Input.svelte';
	export let form;
</script>

<div class="flex flex-col justify-center items-center min-h-screen w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
			Registrate ya y obten tu cuenta
	</h2>
	<p class="text-center mt-1">
			O <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline"
					>Inicia sesion</a
			> Si ya tienes una.
	</p>
	<form action="?/register" method="POST" class="flex flex-col items-center space-y-2 w-full max-w-lg mx-auto pt-4">
			<Input id="firstname" label="Nombre" value={form?.data?.firstname} errors={form?.errors?.firstname} />
			<Input id="lastname" label="Apellido" value={form?.data?.lastname} errors={form?.errors?.lastname} />
			<Input
					type="email"
					id="email"
					label="Correo"
					value={form?.data?.email}
					errors={form?.errors?.email}
			/>
			<Input type="password" id="password" label="Contraseña" errors={form?.errors?.password} />
			<Input
					type="password"
					id="passwordConfirm"
					label="Confirmar Contraseña"
					errors={form?.errors?.passwordConfirm}
			/>
			<Input id="username" label="Nombre de usuario" value={form?.data?.username} errors={form?.errors?.username} />
			<div class="w-full pt-2 px-4 md:px-0">
					<button type="submit" class="btn btn-primary w-full">Registrarse</button>
			</div>
	</form>
</div>
