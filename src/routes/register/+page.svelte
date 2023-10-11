<script>
  export let form;
  
  let password = '';
  let confirm = '';

  let email;

  $:{if(email && form?.error) email.focus()}
  $:passError = (password?.length && confirm?.length)? (password !== confirm)? true: false : false;


</script>

<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Register for an account
	</h2>
	<p class="text-center mt-1">
		Or <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>sign in</a
		> if you already have an account.
	</p>
	<form action="?/register" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
		<div class="form-control w-full max-w-md">
			<label for="firstname" class="label font-medium pb-1">
				<span class="label-text">First Name</span>
			</label>
			<input value={form?.firstname?? ''} type="text" id="firstname" name="firstname" required class="input input-bordered w-full max-w-md" />
		</div>
		<div class="form-control w-full max-w-md">
			<label for="lastname" class="label font-medium pb-1">
				<span class="label-text">Last Name</span>
			</label>
			<input value={form?.lastname?? ''} type="text" id="lastname" name="lastname" required class="input input-bordered w-full max-w-md" />
		</div>
		<div class="form-control w-full max-w-md">
			<label for="email" class="label font-medium pb-1">
				<span class="label-text">Email</span>
			</label>
			<input bind:this={email} on:keydown={()=> {form.error = false; form.message = '';}} id="email" type="email" name="email" class="input input-bordered w-full max-w-md" />
		</div>
		<div class="form-control w-full max-w-md">
			<label for="password" class="label font-medium pb-1">
				<span class="label-text">Password</span>
			</label>
			<input bind:value={password} id="password" type="password" name="password" class="input input-bordered w-full max-w-md" />
		</div>
		<div class="form-control w-full max-w-md">
			<label for="passwordConfirm" class="label font-medium pb-1">
				<span class="label-text">Confirm Password</span>
			</label>
			<input bind:value={confirm} id="confirmPassword" type="password" name="confirmPasswordConfirm" class="input input-bordered w-full max-w-md" />
		</div>
		<div class="form-control w-full max-w-md">
			<label for="username" class="label font-medium pb-1">
				<span class="label-text">Username</span>
			</label>
			<input value={form?.username?? ''} type="text" id="username" name="username" class="input input-bordered w-full max-w-md" />
		</div>
		<div class="w-full max-w-md pt-2">
			<button type="submit" class="btn btn-primary w-full">Register</button>
		</div>
	</form>
</div>