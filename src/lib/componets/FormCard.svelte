<script>
    import { fixMyEnglish } from '../fixMyEnglish'
    let promise = null

    const handleClick = async () => {
        const text = document.getElementById("result").value
        promise = fixMyEnglish(text)
        const value = await promise

        document.getElementById("result").value = value
    }

    const resetButton = async () => {
        promise = await null
        document.getElementById("result").value = null
    }
</script>

<div class="container max-w-lg m-auto flex flex-col gap-4">
  <textarea id="result" class="textarea textarea-bordered" placeholder="Put your english text here" cols=70></textarea>
  
  {#if promise === null}
<button
on:click={handleClick}
type="button" 
class="btn btn-primary"
>Fix it</button>
{:else}

{#await promise}
<button class="btn btn-disable">
    <span class="loading loading-spinner"></span>
    loading...
  </button>
{:then}
    {#if promise != null} 
        <button class="btn btn-success">Success</button>
        <button on:click={resetButton} class="py-4 btn btn-success">Reset</button>
    {/if}
{/await}
{/if}
    
</div>