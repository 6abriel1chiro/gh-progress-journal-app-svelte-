<script lang="ts">
	let username = '';
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
				body: JSON.stringify({ username, password })
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

<div class="login-container">
	<h1>Register</h1>

	{#if errorMessage}
		<div class="error">{errorMessage}</div>
	{/if}

	<form on:submit={handleRegister}>
		<div class="form-group">
			<label for="username">Username:</label>
			<input type="text" id="username" bind:value={username} required />
		</div>

		<div class="form-group">
			<label for="password">Password:</label>
			<input type="password" id="password" bind:value={password} required />
		</div>

		<div class="form-group">
			<label for="password2">Confirm Password:</label>
			<input type="password" id="password2" bind:value={password2} required />
		</div>

		<button type="submit">Register</button>
	</form>

	<p class="mt-4 text-center">
		Already have an account? <a href="/login" class="text-blue-600 hover:underline">Login</a>
	</p>
</div>
