<script>
	import { cohereResponse } from './../../lib/stores.js';
  let loading = false
  export let data 
  export let form 

  let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)

  let input = '';

  async function handleSubmit() {
    const params = new URLSearchParams({
      input: input
    })
    const response = await fetch(`/api/fixMyEnglish?${ params }`)
    const data = await response.json()
    cohereResponse.set(data.response)
    input = JSON.stringify(input)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }
</script>

<main class="container max-w-lg m-auto flex flex-col gap-4">
  <div class="mt-10">
    <h1 class="text-4xl font-bold pl-0 p-10">Bienvenido a Spelly</h1>
    <p class="text-2xl font-medium mb-10">Aqui puedes verificar tus dudas con el idioma ingles, solo tienes que introducir el texto que creas que no es correcto y nostros nos encargaremos de mostrarte el resultado correcto.</p>
  </div>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="join join-vertical">
      <textarea class="textarea textarea-bordered textarea-lg rounded-b-none resize-none" bind:value={input} placeholder="Aqui va tu texto" cols="50" rows="6"></textarea>
      <button class="btn btn-primary join-item rounded-t-full" type="submit">Arreglalo</button>
    </div>
  </form>
  <div class="hero">
    <div class="hero-content">
      <div class="chat chat-start">
        <div class="chat-bubble">{$cohereResponse ? `Respuesta correcta: \n ${ $cohereResponse }`: ''}</div>
      </div>
      <div class="chat chat-end">
        <div class="chat-bubble">{input ? `Respusta incorrecta: \n ${input}` : ''}</div>
      </div>
    </div>
  </div>
		<div>
			<button class="btn btn-primary" disabled={loading} on:click={handleSignOut}>Sign Out</button>
		</div>
</main>