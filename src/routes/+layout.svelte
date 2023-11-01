<script>
	/** @type {import('./$types').LayoutData} */
	import { getImageURL } from './../lib/utils.js';
	import ViewTransition from './navigation.svelte';
	import '../app.postcss';
	export let data;
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
	<div class="navbar shadow-sm rounded-2xl">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-2xl font-bold">Spelly</a>
		</div>
		{#if !data.user?.verified}
			<div class="dropdown dropdown-end">
				<a href="/login" class="btn btn-primary">Iniciar sesion</a>
				<a href="/register" class="btn btn-secondary">Registrarse</a>
			</div>
      🌞
      <div class="inline-block w-10">
        <span data-toggle-theme="darkspelly" data-act-class="pl-4" class="border rounded-full border-green-700 flex items-center cursor-pointer w-10 transition-all duration-300 ease-in-out pl-0">
          <span class="rounded-full w-3 h-3 m-1 bg-green-700">
          </span>
        </span>
      </div>
      🌚
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
					<li><a href="/my/corrections">Mis correciones</a></li>
					<li><a data-sveltekit-reload href="/logout">Cerrar sesion</a></li>
				</ul>
			</div>
      🌞
      <div class="inline-block w-10">
        <span data-toggle-theme="darkspelly" data-act-class="pl-4" class="border rounded-full border-green-700 flex items-center cursor-pointer w-10 transition-all duration-300 ease-in-out pl-0">
          <span class="rounded-full w-3 h-3 m-1 bg-green-700">
          </span>
        </span>
      </div>
      🌚
		{/if}
	</div>
</header>
<main class="container max-w-lg h-auto m-auto flex flex-col">
	<slot />
</main>

<style>
</style>
