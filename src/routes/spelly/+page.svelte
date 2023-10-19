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

<main class="hero rounded-lg mt-6 bg-slate-400 container max-w-xs lg:max-w-xl md:max-w-lg w-auto h-auto p-10 m-auto flex flex-col gap-4">
  <div class="text-slate-950">
    <h1 class="text-4xl font-bold pl-0 p-5">Bienvenido a Spelly</h1>
    <p class="text-2xl font-medium mb-10">Aqui puedes verificar tus dudas con el idioma ingles, solo tienes que introducir el texto que creas que no es correcto y nostros nos encargaremos de mostrarte el resultado correcto.</p>
  </div>
  <form on:submit|preventDefault={handleSubmit} class="form-control">
    <div class="join join-vertical">
      <textarea class="textarea textarea-bordered w-full max-w-xs lg:textarea-4xl xl:textarea-3xl md:textarea-lg rounded-b-none resize-none box-border" bind:value={input} placeholder="Aqui va tu texto"></textarea>
      <button class="btn btn-primary join-item rounded-t-full" type="submit">Arreglalo</button>
    </div>
  </form>
  <form action="?/saveCorrection" method="POST" class="w-full">
    <div class="hero bg-base-200 rounded-lg rounded-b-none max-w-lg justify-center items-center m-auto">
      <div class="hero-content w-full h-72">
          <div class="max-w-max">
            <textarea class="disabled resize-none bg-success chat-bubble text-slate-900 w-fit h-40 text-md/6" id="content" name="content" readonly bind:value={$cohereResponse} placeholder="{$cohereResponse ? `Respuesta correcta: \n ${ $cohereResponse }`: ''}"></textarea>
            <label for="content">Respuesta correcta</label>
          </div>
          <div class="max-w-max">
            <textarea class="bg-error chat-bubble text-gray-900 h-40 overflow-auto text-md/6" readonly placeholder="">{input ? `${input}` : ''}</textarea>
            <label for="">Respuesta incorrecta</label>
          </div>
        </div>
      </div>
      <button class="btn btn-primary join-item rounded-b-lg w-full rounded-t-none" type="submit">Guardalo</button>  
  </form>
</main>