<script>
	import { Auth } from '@supabase/auth-ui-svelte'
	import { ThemeSupa } from '@supabase/auth-ui-shared'
	
	export let data
</script>

<main class="container max-w-lg m-auto flex flex-col gap-4">
	<Auth
		supabaseClient={data.supabase}
		view='magic_link'
		redirectTo={`${data.url}/auth/callback`}
		showLinks={true}
		appearance={{ theme: ThemeSupa, styke: { input: 'color: #fff'} }}
		/>
</main>