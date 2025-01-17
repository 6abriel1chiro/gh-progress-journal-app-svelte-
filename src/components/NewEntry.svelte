<script lang="ts">
	let content = '';
	let concepts_learned = '';
	let error = '';
	let success = '';

	async function handleSubmit() {
		try {
			const token = localStorage.getItem('accessToken');
			const response = await fetch('http://127.0.0.1:8000/api/entries/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					content,
					concepts_learned
				})
			});

			if (response.ok) {
				success = 'Entry created successfully!';
				content = '';
				concepts_learned = '';
			} else {
				const data = await response.json();
				error = data.detail || 'Failed to create entry';
			}
		} catch (err) {
			error = 'Error creating entry';
			console.error('Error:', err);
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div>
		<label for="content">Journal Entry:</label>
		<textarea id="content" bind:value={content} required></textarea>
	</div>

	<div>
		<label for="concepts">Concepts Learned:</label>
		<textarea id="concepts" bind:value={concepts_learned} required></textarea>
	</div>

	{#if error}
		<div class="error">{error}</div>
	{/if}

	{#if success}
		<div class="success">{success}</div>
	{/if}

	<button type="submit">Create Entry</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 600px;
		margin: 0 auto;
	}

	textarea {
		width: 100%;
		min-height: 100px;
		padding: 0.5rem;
	}

	.error {
		color: red;
		margin: 1rem 0;
	}

	.success {
		color: green;
		margin: 1rem 0;
	}
</style>
