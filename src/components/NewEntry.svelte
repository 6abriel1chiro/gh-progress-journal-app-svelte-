<script lang="ts">
	import { auth } from '$lib/stores/auth';

	let content = '';
	let concepts_learned = '';
	let error = '';
	let success = '';

	async function handleSubmit() {
		try {
			const response = await fetch('http://127.0.0.1:8000/api/entries/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${$auth.accessToken}`
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

<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
	<form on:submit|preventDefault={handleSubmit} class="space-y-6">
		{#if error}
			<div class="rounded-md bg-red-50 p-4">
				<div class="flex">
					<div class="flex-shrink-0">
						<!-- Heroicon name: x-circle -->
						<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-red-800">{error}</p>
					</div>
				</div>
			</div>
		{/if}

		{#if success}
			<div class="rounded-md bg-green-50 p-4">
				<div class="flex">
					<div class="flex-shrink-0">
						<!-- Heroicon name: check-circle -->
						<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-green-800">{success}</p>
					</div>
				</div>
			</div>
		{/if}

		<div class="space-y-4">
			<div>
				<label for="content" class="block text-sm font-medium text-gray-700">
					What did you work on today?
				</label>
				<div class="mt-1">
					<textarea
						id="content"
						bind:value={content}
						required
						rows="4"
						class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
						placeholder="Describe what you worked on..."
					/>
				</div>
			</div>

			<div>
				<label for="concepts" class="block text-sm font-medium text-gray-700">
					What concepts did you learn?
				</label>
				<div class="mt-1">
					<textarea
						id="concepts"
						bind:value={concepts_learned}
						required
						rows="3"
						class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
						placeholder="List the key concepts you learned..."
					/>
				</div>
			</div>
		</div>

		<div class="flex justify-end">
			<button
				type="submit"
				class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Save Entry
			</button>
		</div>
	</form>
</div>
