<script>
    import { _ } from 'svelte-i18n'
	import { enhance } from '$app/forms';
    import { page } from '$app/stores';
	import { toast } from 'svelte-french-toast';
	import Input from '$lib/components/Input.svelte';
	export let form;
	let loading = false;

	const submitLogin = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'error':
					toast.error('Oups, parece que hubo un error, intenta con otro correo o contraseña');
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

</script>

<main class="flex flex-col justify-center items-center min-h-screen w-full">
    <div class="flex flex-col items-center space-y-2 w-full max-w-lg mx-auto p-4">
        <h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
            {$_('login')}
        </h2>
        <p class="text-center mt-1">
            {$_('or')} <a href="/register" class="text-primary font-medium hover:cursor-pointer hover:underline"
                >{$_('register')}</a
            > {$_('loginDescription')}
        </p>
        <form
            method="POST"
            class="flex flex-col items-center space-y-2 w-full max-w-lg mx-auto pt-4"
            action="?/login"
            use:enhance={submitLogin}
        >
            <Input
                type="email"
                id="email"
                label="{$_('email')}"
                value={form?.data?.email ?? ''}
                errors={form?.errors?.email}
                disabled={loading}
            />
            <Input
                type="password"
                id="password"
                label="{$_('password')}"
                errors={form?.errors?.password}
                disabled={loading}
            />
            <div class="w-full">
                <a
                    href="/reset-password"
                    class="font-medium text-primary hover:cursor-pointer hover:underline"
                >
                    {$_('forgotPassword')}
                </a>
            </div>
            <div class="w-full pt-2 px-4 md:px-0">
                <button type="submit" class="btn btn-primary w-full" disabled={loading}>Iniciar sesión</button
                >
            </div>
            {#if $page.url.searchParams.get('verifyEmail') === 'true'}
                <div class="alert alert-error shadow-lg w-full">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{$_('verifyEmail')}</span>
                    </div>
                </div>
            {/if}
        </form>
    </div>
</main>
