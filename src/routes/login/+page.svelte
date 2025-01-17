<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';
	let errorMessage = '';

	async function handleLogin(event: { preventDefault: () => void }) {
		event.preventDefault();

		try {
			const response = await fetch('http://127.0.0.1:8000/api/token/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password }),
				credentials: 'include'
			});

			const data = await response.json();

			if (response.ok) {
				auth.login(data);
				await goto('/');
			} else {
				errorMessage = data.detail || 'Invalid credentials';
			}
		} catch (error) {
			console.error('Full error:', error);
			errorMessage = 'An error occurred during login';
		}
	}
</script>

<div class="login-container">
	<h1>Login</h1>

	{#if errorMessage}
		<div class="error">{errorMessage}</div>
	{/if}

	<form on:submit={handleLogin}>
		<div class="form-group">
			<label for="username">Username:</label>
			<!-- Changed from email to username -->
			<input type="text" id="username" bind:value={username} required />
		</div>

		<div class="form-group">
			<label for="password">Password:</label>
			<input type="password" id="password" bind:value={password} required />
		</div>

		<button type="submit">Login</button>
	</form>

	<p class="mt-4 text-center">
		Don't have an account? <a href="/register" class="text-blue-600 hover:underline">Register</a>
	</p>
</div>
