<script>
	/** @type {import('./$types').LayoutData} */
	import { getImageURL } from './../lib/utils.js';
	import ViewTransition from '$lib/components/navigation.svelte';
	import '../app.postcss';
	export let data;
    import toast, { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<ViewTransition />
<header>
	<div class="navbar bg-opacity-30 backdrop-filter backdrop-blur-lg bg-base-100 z-10 fixed shadow-sm rounded-b-2xl">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-2xl font-bold">Spelly</a>
		</div>
		{#if !data.user?.verified}
			<div class="dropdown dropdown-end">
				<a href="/login" class="btn btn-primary rounded-full">Iniciar sesion</a>
				<a href="/register" class="btn btn-secondary rounded-full ml-2">Registrarse</a>
			</div>
			<div class="dropdown dropdown-end ml-2">
				<button tabindex="0" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
				</button>
				<ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
					<!-- your dropdown content here -->
				</ul>
				<ul
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><button data-set-theme="light" data-act-class="ACTIVECLASS">🌞 Light</button></li>
					<li><button data-set-theme="dark" data-act-class="ACTIVECLASS">🌚 Dark</button></li>
				</ul>
			</div>
		{:else}
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img
							src={data.user?.avatar
								? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
								: `https://ui-avatars.com/api/?name=${data.user?.username}`}
							alt="User avatar"
						/>
					</div>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><a href="/my/settings">Ajuste</a></li>
					<li><a data-sveltekit-reload href="/logout">Cerrar sesion</a></li>
				</ul>
			</div>
			<div class="dropdown dropdown-end ml-2">
				<button tabindex="0" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
				</button>
				<ul
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><button data-set-theme="light" data-act-class="ACTIVECLASS">🌞 Light</button></li>
					<li><button data-set-theme="dark" data-act-class="ACTIVECLASS">🌚 Dark</button></li>
				</ul>
			</div>
		{/if}
	</div>
</header>
<Toaster />
<slot />

<style>
	/* Add any custom styles here if needed */
</style>
