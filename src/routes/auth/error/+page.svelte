<script>
    import { onMount } from 'svelte';

    onMount(() => {
        document.title = 'Authentication Error';
    });
</script>

<main class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-4xl font-bold mb-4">Error de autenticación</h1>
    <p class="text-lg text-gray-600 mb-8">Hubo un error al autenticar. Por favor, inténtelo de nuevo.</p>
    <a href="/login" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">Go to Login</a>
</main>
