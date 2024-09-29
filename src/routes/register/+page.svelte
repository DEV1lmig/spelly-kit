<script>
	import Input from '$lib/components/Input.svelte';
    import { _ } from 'svelte-i18n'

	export let form;
</script>
<main class="flex flex-col justify-center items-center min-h-screen w-full">
    <div class="flex my-28 flex-col items-center space-y-2 w-full max-w-lg mx-auto p-4">
        <h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
                {$_('registerTitle')}
        </h2>
        <p class="text-center mt-1">
                {$_('or')} <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline"
                        >{$_('login')}</a
                > {$_('registerDescription')}
        </p>
        <form action="?/register" method="POST" class="flex flex-col items-center space-y-2 w-full max-w-lg mx-auto pt-4">
                <Input id="firstname" label="{$_('name')}" value={form?.data?.firstname} errors={form?.errors?.firstname} />
                <Input id="lastname" label="{$_('lastName')}" value={form?.data?.lastname} errors={form?.errors?.lastname} />
                <Input
                        type="email"
                        id="email"
                        label="{$_('email')}"
                        value={form?.data?.email}
                        errors={form?.errors?.email}
                />
                <Input type="password" id="password" label="{$_('password')}" errors={form?.errors?.password} />
                <Input
                        type="password"
                        id="passwordConfirm"
                        label="{$_('passwordConfirm')}"
                        errors={form?.errors?.passwordConfirm}
                />
                <Input id="username" label="{$_('userName')}" value={form?.data?.username} errors={form?.errors?.username} />
                <div class="w-full pt-2 px-4 md:px-0">
                        <button type="submit" class="btn btn-primary w-full">{$_('register')}</button>
                </div>
        </form>
    </div>
</main>
