<script lang="ts">
	let username = '';
	let email = '';
	let password = '';
	let password2 = '';
	let errorMessage = '';

	async function handleRegister(event: { preventDefault: () => void }) {
		event.preventDefault();

		if (password !== password2) {
			errorMessage = 'Passwords do not match';
			return;
		}

		try {
			const response = await fetch('http://127.0.0.1:8000/api/register/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, email, password })
			});

			if (response.ok) {
				window.location.href = '/login';
			} else {
				const errorData = await response.json();
				errorMessage = errorData.detail || 'Registration failed';
			}
		} catch (error) {
			errorMessage = 'An error occurred during registration';
		}
	}
</script>

<div class="container mx-auto max-w-md p-4">
	<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
		<h1 class="mb-6 text-2xl font-bold text-gray-900">Create an Account</h1>

		{#if errorMessage}
			<div class="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div>
		{/if}

		<form on:submit={handleRegister} class="space-y-4">
			<div>
				<label for="username" class="mb-2 block text-sm font-medium text-gray-700">Username</label>
				<input
					type="text"
					id="username"
					bind:value={username}
					required
					class="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div>
				<label for="email" class="mb-2 block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					class="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div>
				<label for="password" class="mb-2 block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					class="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div>
				<label for="password2" class="mb-2 block text-sm font-medium text-gray-700"
					>Confirm Password</label
				>
				<input
					type="password"
					id="password2"
					bind:value={password2}
					required
					class="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<button
				type="submit"
				class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Register
			</button>
		</form>

		<p class="mt-4 text-center text-sm text-gray-600">
			Already have an account? <a href="/login" class="text-blue-600 hover:underline">Login</a>
		</p>
	</div>
</div>
