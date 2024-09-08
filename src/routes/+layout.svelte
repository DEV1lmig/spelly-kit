<script>
    /** @type {import('./$types').LayoutData} */
    import ViewTransition from './navigation.svelte';
    import '../app.postcss';
    export let data;
    import { onMount } from 'svelte';
    import { themeChange } from 'theme-change';
    let { session, supabase, user } = data;
    $: ({session, supabase, user} = data);
    let username = user?.user_metadata?.username ?? '';
    let avatarUrl = user?.user_metadata?.avatar_url ?? undefined;



    onMount(() => {
        themeChange(false);
    });
</script>

<ViewTransition />
<header>
    <div class="navbar fixed shadow-sm rounded-2xl w-full bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 z-10">
        <div class="flex-1">
            <a href="/" class="btn btn-ghost normal-case text-2xl font-bold">Spelly</a>
        </div>
        {#if !data?.user}
        <div class="flex flex-row w-full justify-end gap-2">
            <a href="/login" class="btn btn-primary md:w-auto w-20"><span class="md:text-sm text-xs font-bold truncate">Iniciar sesión</span></a>
            <a href="/register" class="btn btn-secondary md:w-auto w-20"><span class="md:text-sm text-xs font-bold truncate">Registrarse</span></a>
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
                            src={`https://ui-avatars.com/api/?name=${username}` ? `https://ui-avatars.com/api/?name=${username}` : avatarUrl}
                            alt="Avatar del usuario"
                        />
                    </div>
                </label>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li><a href="/my/settings">Ajustes</a></li>
                    <li><a href="/my/corrections">Mis correcciones</a></li>
                    <li><a data-sveltekit-reload href="/logout">Cerrar sesión</a></li>
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

    <slot />
