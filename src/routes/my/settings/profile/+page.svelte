<script>
    import { createEventDispatcher } from 'svelte';
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Pencil } from 'svelte-hero-icons';
	import Input from '../../../Input.svelte';
	export let data;
    let { session, user, supabase } = data;
    $: ({ session, user, supabase } = data);
	let loading = false;
    let profileForm;
    let username = user?.user_metadata?.username ?? '';
    let avatar_url = user?.avatar_url ?? '';
    let userId = user?.id ?? '';

    const dispatch = createEventDispatcher();

    const previewProfile = async (event) => {
        const target = event.target;
        const files = target.files;
        const filePath = `${data.user.id}/${files[0].name}`;
        if (files.length > 0) {
            const src = URL.createObjectURL(files[0]);
            const preview = document.getElementById('avatar-preview');
            preview.src = src;
            const { error } = await supabase.storage.from('avatars').upload(filePath, files[0]);

            if (error) {
                console.log('Error uploading avatar: ', error.message);
                throw error;
            }

            // Get the public URL of the uploaded avatar
            const { publicURL, error: urlError } = supabase.storage.from('avatars').getPublicUrl(filePath);

            if (urlError) {
                console.log('Error getting public URL: ', urlError.message);
                throw urlError;
            }

            // Update the user's profile with the new avatar URL
            const { error: updateError } = await supabase.auth.updateUser({
                data: { avatar_url: publicURL }
            });

            if (updateError) {
                console.log('Error updating user profile: ', updateError.message);
                throw updateError;
            }

            // Update the local avatar_url variable
            avatar_url = publicURL;
        }
        }

	const handleSubmit  = () => {
		loading = true
		return async () => {
			loading = false
		}
	}

</script>

<form method="POST" action="/?updateProfile" on:submit|preventDefault={handleSubmit && previewProfile} class="form-control max-w-lg">
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
                src={avatar_url || `https://ui-avatars.com/api/?name=${username}`}
                alt="user avatar"
                id="avatar-preview"
            />
            <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                hidden
                on:change={previewProfile}
                disabled={loading}
            />
        </div>
    </label>
    <Input id="username" label="Nombre de usuario" value={username} disabled={loading} />
    <div class="w-full max-w-lg pt-3">
        <button class="btn btn-primary w-full max-w-lg" type="submit" disabled={loading}>
            Actualizar
        </button>
    </div>
</form>
