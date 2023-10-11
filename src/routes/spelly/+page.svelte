<script>
	import { cohereResponse } from './../../lib/stores.js';
  let input = ''
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

<main class="hero rounded-lg mt-6 bg-slate-400 container max-w-xl w-auto h-auto p-10 m-auto flex flex-col gap-4">
  <div class="text-slate-950">
    <h1 class="text-4xl font-bold pl-0 p-5">Bienvenido a Spelly</h1>
    <p class="text-2xl font-medium mb-10">Aqui puedes verificar tus dudas con el idioma ingles, solo tienes que introducir el texto que creas que no es correcto y nostros nos encargaremos de mostrarte el resultado correcto.</p>
  </div>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="join join-vertical">
      <textarea class="textarea textarea-bordered textarea-lg rounded-b-none resize-none" bind:value={input} placeholder="Aqui va tu texto" cols="54" rows="6"></textarea>
      <button class="btn btn-primary join-item rounded-t-full" type="submit">Arreglalo</button>
    </div>
  </form>
  <div class="hero bg-base-200 rounded-lg max-w-lg">
    <div class="hero-content">
      <div class="chat chat-start">
        <div class="bg-success chat-bubble text-slate-900">{$cohereResponse ? `Respuesta correcta: \n ${ $cohereResponse }`: ''}</div>
      </div>
      <div class="chat chat-end">
        <div class="bg-error chat-bubble text-zinc-300">{input ? `Respusta incorrecta: \n ${input}` : ''}</div>
      </div>
    </div>
  </div>
</main>