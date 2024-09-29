<script>
    import { _ } from 'svelte-i18n'
	import { enhance } from '$app/forms';
    import { geminiResponse } from '$lib/stores.js';
    import { onMount } from 'svelte';
    import MyCorrectionItem from '$lib/components/MyCorrectionItem.svelte';
    import toast from 'svelte-french-toast';

    export let data;

    let corrections = [];
    let input = '';

    onMount(async () => {
      corrections = await data.corrections;
    });

    async function handleSubmit() {
      const params = new URLSearchParams({ input: input });
      const response = await fetch(`/api/fixMyEnglish?${params}`);
      const data = await response.json();
      geminiResponse.set(data.response);
    }
  </script>

  <main class="flex justify-center items-center lg:h-screen">
    <div class="container p-4 my-20 md:p-6 lg:p-10 bg-base-200 rounded-lg shadow-md mx-4 md:mx-6 lg:mx-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

      <section>
        <h1 class="text-3xl md:text-4xl font-bold pl-0 text-primary">{$_('welcome')}</h1>
        <p class="text-xl md:text-2xl font-medium mb-10 text-primary-content">
            {$_('spellyDescription')}
        </p>
        <form on:submit|preventDefault={handleSubmit} class="flex flex-col justify-center">
          <textarea
            class="textarea textarea-bordered resize-none textarea-xs md:textarea-md lg:textarea-lg w-full bg-neutral-50 text-neutral"
            bind:value={input}
            placeholder={$_('placeholderSpeech')}
            rows="6"
          />
          <button class="btn btn-primary mt-4 bg-primary" type="submit">{$_('fixIt')}</button>
        </form>
		{#if $geminiResponse}
			<form use:enhance={({ form, data, action, cancel }) => {
                 return async ({ result, update }) => {
        if (result.type === 'success') {
            toast.success({text: $_('correctionSaved')});
            corrections = [...corrections, { text: input, correctedText: $geminiResponse }];
            input = '';
            geminiResponse.set(false);
        } else {
            toast.error({text: $_('errorSavingCorrection')});
        }
    };
            }} action="?/saveCorrection" method="POST">
				<div class="mt-4 bg-success p-4 rounded-lg text-base-100">
					<h2 class="text-2xl font-bold mb-2 text-base-100">{$_('correctedResponse')}:</h2>
					<p class="mb-2">{$geminiResponse}</p>
					<input type="hidden" name="correctionResponse" bind:value={$geminiResponse} />
					<button class="btn btn-primary join-item rounded-b-lg w-full rounded-t-none" type="submit"
						>{$_('save')}</button
					>
				</div>
			</form>
		{/if}

      </section>

      <section>
        <h2 class="text-2xl font-bold text-primary mb-4">{$_('corrections')}</h2>

        {#if corrections.length === 0}
          <div class="flex flex-col items-center justify-center h-auto p-8 bg-base-100 rounded-lg">
            <p class="text-center text-2xl text-gray-600">{$_('noCorrectionYet')}</p>
          </div>
        {:else}
          <div class="flex flex-col items-center">
            {#each corrections as correction}
              <MyCorrectionItem correction={correction} />
              <div class="h-px w-full bg-gray-200 mt-0 mb-2"></div>
            {/each}
          </div>
        {/if}
      </section>

    </div>
  </main>
