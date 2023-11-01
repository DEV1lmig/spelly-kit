<script>
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-french-toast';
	import Input from '../Input.svelte';
	export let form;
	let loading = false;

	const submitLogin = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'invalid':
					toast.error('Invalid credentials');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

</script>

<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Inicia sesión
	</h2>
	<p class="text-center mt-1">
		O <a href="/register" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>registrate</a
		> si todavia no tienes una cuenta.
	</p>
	<form
		action="?/login"
		method="POST"
		class="flex flex-col items-center space-y-2 w-full pt-4"
		use:enhance={submitLogin}
	>
		<Input
			type="email"
			id="email"
			label="Correo"
			value={form?.data?.email ?? ''}
			errors={form?.errors?.email}
			disabled={loading}
		/>
		<Input
			type="password"
			id="password"
			label="Contraseña"
			errors={form?.errors?.password}
			disabled={loading}
		/>
		<div class="w-full max-w-lg">
			<a
				href="/reset-password"
				class="font-medium text-primary hover:cursor-pointer hover:underline"
			>
				¿Olvidó su contraseña? ¡Recuperela!</a
			>
		</div>

		<div class="w-full max-w-lg pt-2">
			<button type="submit" class="btn btn-primary w-full" disabled={loading}>Iniciar sesión</button>
		</div>
		{#if form?.notVerified}
			<div class="alert alert-error shadow-lg w-full max-w-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>Debes verificar tu email antes de iniciar sesión</span>
						<a class="btn btn-ghost text-secondary m-0 p-0" href="../auth">Verifca tu email ya</a>
				</div>
			</div>
		{/if}
	</form>
</div>