<script>
	import { page } from '$app/stores';
    import { _ } from 'svelte-i18n';
	const navigation = [
		{
			title: $_('profile'),
			href: '/my/settings/profile'
		}
	];
</script>

<div class="md:max-w-lg w-32 min-h-auto m-auto pt-20">
	<h3 class="text-2xl font-medium">{$_('settings')}</h3>
	<div class="divider mb-1" />
</div>
<div class="flex flex-col justify-center items-center w-full h-auto space-x-4 ">
	<ul class="menu menu-horizontal justify-center bg-base-100 w-56 rounded-box">
		{#each navigation as navItem}
			<li>
				<a
					href={navItem.href}
					class="font-medium {$page.url.pathname === navItem.href ? 'active' : ''}"
					>{navItem.title}</a
				>
			</li>
		{/each}
	</ul>
	<div class="w-full flex flex-col justify-center items-center">
		<slot />
	</div>
</div>
