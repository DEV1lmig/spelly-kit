<script>
  /** @type {import('./$types').LayoutData} */
	  import { getImageURL } from './../lib/utils.js';
    import ViewTransition from './navigation.svelte'
    import "../app.postcss";
    export let data
</script>

<ViewTransition />
<header>
    <div class="navbar rounded-b-lg bg-slate-800">
        <div class="flex-1">
            <a href="/" class="btn btn-ghost normal-case text-2xl font-bold">Spelly</a>
        </div>
        {#if !data.user}
          <div class="dropdown dropdown-end">
            <a href="/login" class="btn btn-primary">Login</a>
            <a href="/register" class="btn btn-secondary">Register</a>
          </div>
        {:else}
          <div class="dropdown dropdown-end">
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <img src={data.user?.avatar
                    ? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
                    : `https://ui-avatars.com/api/?name=${data.user?.username}`} alt="User avatar" />
                </div>
              </label>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-800 rounded-box w-52">
                <li><a href="/my/settings">Settings</a></li>
                <li><a data-sveltekit-reload href="/logout">Logout</a></li>
              </ul>
            </div>
        {/if}
    </div>
</header>
<main class="container max-w-full h-auto m-auto flex flex-col">
  <slot />
</main>