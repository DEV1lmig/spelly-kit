<script>
    import { fixMyEnglish } from '../fixMyEnglish'
    let promise = null
    let minleng = 5

    const handleClick = async () => {
        const text = document.getElementById("result").value
        const length = text.length
        if (length > minleng){
            promise = fixMyEnglish(text)
        }else{
            promise = "El texto tiene que ser mayor a 5 caracteres"
        }
        const value = await promise

        document.getElementById("result").value = value
    }


    const resetButton = async () => {
        promise = await null
        document.getElementById("result").value = null
    }
</script>

<div class="container max-w-lg m-auto flex flex-col gap-4">
  <textarea id="result" class="textarea textarea-bordered" placeholder="Introduce tu texto en ingles" cols=70></textarea>

    {#if promise === null}
    <button
    on:click={handleClick}
    type="button" 
    class="btn btn-primary"
    >Arreglalo</button>
    {:else}

    {#await promise}
    <button class="btn btn-disable">
        <span class="loading loading-spinner"></span>
        cargando...
    </button>
    {:then}
        {#if promise != null} 
            <button class="btn btn-success">Completado</button>
            <button on:click={resetButton} class="py-4 btn btn-success">Resetear</button>
        {/if}
    {/await}
    {/if}
</div>