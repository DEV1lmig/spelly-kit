<!-- FILEPATH: /c:/Users/devmig/Documents/projects/web/spelly-kit/src/routes/auth/+page.svelte -->

<script>

</script>

<main class="flex flex-col items-center h-full w-full p-8 rounded-lg shadow-md">
  <h1 class="text-2xl font-bold mb-4">Se require verificacion de tu email</h1>
  <p class="mb-4">Por favor verifica tu email para continuar.</p>
  <form action="?/verification" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
    <button type="submit" class="btn btn-primary">Verificar Email</button>
  </form>
</main>
