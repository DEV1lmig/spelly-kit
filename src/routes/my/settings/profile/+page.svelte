<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Pencil } from 'svelte-hero-icons';
	import { getImageURL } from '$lib/utils';
	import Input from '../../../Input.svelte';

	export let data;
	let loading;

	$: loading = false;
	const showPreview = (event) => {
		const target = event.target;
		const files = target.files;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('avatar-preview');
			preview.src = src;
		}
	};

	const submitUpdateProfile = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<div>
	<form
		action="?/updateProfile"
		method="POST"
		class="flex flex-col gap-2 w-full m-0"
		enctype="multipart/form-data"
		use:enhance={submitUpdateProfile}
	>
		<h3 class="text-2xl font-medium">Actualizar perfil</h3>
		<div class="form-control max-w-lg">
			<label for="avatar" class="label font-medium pb-1">
				<span class="label-text">Foto de perfil</span>
			</label>
			<label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
				<label for="avatar" class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer">
					<span class="btn btn-circle btn-sm btn-secondary">
						<Icon src={Pencil} class="w-4 h-4" />
					</span>
				</label>
				<div class="w-32 rounded-full">
					<img
						src={data.user?.avatar
							? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
							: `https://ui-avatars.com/api/?name=${data.user?.username}`}
						alt="user avatar"
						id="avatar-preview"
					/>
				</div>
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept="image/*"
				hidden
				on:change={showPreview}
				disabled={loading}
			/>
		</div>
		<Input id="username" label="Nombre de usuario" value={data?.user?.username} disabled={loading} />
		<div class="w-full max-w-lg pt-3">
			<button class="btn btn-primary w-full max-w-lg" type="submit" disabled={loading}>
				Actualizar
			</button>
		</div>
	</form>
</div>