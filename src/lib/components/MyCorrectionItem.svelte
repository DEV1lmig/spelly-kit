<script>
  import { enhance } from '$app/forms'
	import Modal from './Modal.svelte';

  export let correction

  let modalOpen;

  $: modalOpen = false;
</script>

<div class="w-full h-20 flex items-center justify-between">
  <div class="flex flex-col w-full ml-4 h-full justify-center">
      <a href="/corrections/{correction.id}" class="font-semibold text-lg">{correction.text}</a>
  </div>
  <div class="flex items-center justify-end w-full">
      <Modal label={correction.id} checked={modalOpen}>
          <span slot="trigger" class="btn btn-error ml-2">Borrar</span>
          <div slot="heading">
              <h3 class="text-2x1">Borrar {correction.content}</h3>
              <p class="text-base font-normal mt-2">
                  ¿Estas seguro que quieres borrar esta correción? Esto no se puede deshacer.
              </p>
          </div>
          <div slot="actions" class="flex w-full items-center justify-center space-x-2">
      <label for={correction.id} class="btn btn-outline">Cancelar</label>
      <form action="?/deleteProject" method="POST" use:enhance>
        <input type="hidden" name="id" value={correction.id} />
        <button type="submit" class="btn btn-error">Delete</button>
      </form>
    </div>
      </Modal>
  </div>
</div>
