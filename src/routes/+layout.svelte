<script>
  /** @type {import('./$types').LayoutData} */
    import "../app.postcss";
</script>
<header class="pb-2">
    <div class="navbar rounded-b-lg bg-slate-800">
        <div class="flex-1">
            <a href="/" class="btn btn-ghost normal-case text-2xl font-bold">Spelly</a>
        </div>
        <div class="dropdown dropdown-end">
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="profile-pic"/>
              </div>
            </label>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-800 rounded-box w-52">
              <li>
                <a href="/profile" class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li><a href="/settings">Settings</a></li>
              <li><a data-sveltekit-reload href="/logout">Logout</a></li>
            </ul>
          </div>
    </div>
</header>
<main class="container max-w-lg m-auto flex flex-col gap-4">
</main>
<slot />