<script>
	import { cohereResponse } from './../../lib/stores.js';
  let input = ''
  cohereResponse.set('')
  async function handleSubmit() {
    const params = new URLSearchParams({
      input: input
    })
    const response = await fetch(`/api/fixMyEnglish?${ params }`)
    const data = await response.json()
    cohereResponse.set(data.response)
    input = JSON.stringify(input)
  }

</script>

<main class="container max-w-xs lg:max-w-xl md:max-w-lg w-auto m-auto flex flex-col h-auto">
  <div class="rounded-lg bg-gray-400 flex flex-col p-10 gap-4 h-auto backdrop-filter backdrop-blur-md bg-opacity-40 bg-clip-padding">
    <div class="gap-4 items-center">
      <h1 class="text-md md:text-lg lg:text-2xl font-bold">Bienvenido a Spelly</h1>
      <p class="text-sm md:text-md lg:text-lg font-medium">Aqui puedes verificar tus dudas con el idioma ingles, solo tienes que introducir el texto que creas que no es correcto y nostros nos encargaremos de mostrarte el resultado correcto.</p>
    </div>
    <form on:submit|preventDefault={handleSubmit} class="form-control">
      <div class="join join-vertical items-center">
        <textarea class="textarea textarea-bordered w-full max-w-xs lg:textarea-lg xl:textarea-2xl md:textarea-md rounded-b-none resize-none box-border" bind:value={input} placeholder="Aqui va tu texto"></textarea>
        <button class="btn btn-primary join-item rounded-t-full max-w-full w-[20rem]" type="submit">Arreglalo</button>
      </div>
    </form>
    <form action="?/saveCorrection" method="POST" class="w-full items-center">
      <div class="hero bg-base-200 rounded-lg rounded-b-none max-w-lg justify-center items-center m-auto">
        <div class="">
            <div class="max-w-max hero-content">
              <textarea class="ml-4 rounded disabled resize-none bg-success text-slate-900 lg:textarea-lg xl:textarea-2xl md:textarea-md text-md/6" id="content" name="content" readonly bind:value={$cohereResponse} placeholder="{$cohereResponse ? `Respuesta correcta: \n ${ $cohereResponse }`: ''}"></textarea>
              <label for="content">Respuesta correcta</label>
            </div>
            <div class="max-w-max hero-content">
              <textarea class="ml-4 rounded bg-error min-w-min max-w-max resize-none text-gray-900 lg:textarea-lg xl:textarea-2xl md:textarea-md overflow-auto text-md/6" readonly placeholder="">{input ? `${input}` : ''}</textarea>
              <label for="">Respuesta incorrecta</label>
            </div>
          </div>
        </div>
        <button class="btn btn-primary join-item rounded-b-lg w-full rounded-t-none" type="submit">Guardalo</button>  
    </form>
  </div>
</main>