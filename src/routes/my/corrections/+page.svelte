<script>
	import MyCorrectionItem from './../../../lib/components/MyCorrectionItem.svelte';
    export let data
</script>

<main class="container w-full flex flex-col justify-center items-center m-auto p-4">
    <h2 class="text-3xl font-bold">Mis correcciones</h2>
    <div class="w-full mt-4 flex flex-col items-center">
        {#if data.corrections.length === 0}
            <p class="text-center text-3xl">😢</p>
            <p class="text-center text-3xl">
                No tienes ninguna correción todavia...
            </p>
            <a href="/spelly" class="btn btn-primary max-w-md mt-4">Agrega una</a>  
        {:else}
            {#each data.corrections as correction}
                <MyCorrectionItem {correction}/>
                <div class="divider mt-0 mb-2"></div>
            {/each}
        {/if}
    </div>
</main>