<!-- FILEPATH: /c:/Users/devmig/Documents/projects/web/spelly-kit/src/routes/auth/+page.svelte -->

<script>

</script>

<main class="flex flex-col items-center h-full w-full p-8 rounded-lg shadow-md">
  <h1 class="text-2xl font-bold mb-4">Email Verification Required</h1>
  <p class="mb-4">Please verify your email address to continue.</p>
  <form action="?/verification" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
    <button type="submit" class="btn btn-primary">Verify Email</button>
  </form>
</main>
