<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { format } from 'date-fns';

	interface JournalEntry {
		id: number;
		date: string;
		content: string;
		concepts_learned: string;
		created_at: string;
		updated_at: string;
	}

	let entries: JournalEntry[] = [];
	let error = '';
	let loading = true;

	async function fetchEntries() {
		try {
			const response = await fetch('http://127.0.0.1:8000/api/entries/', {
				headers: {
					Authorization: `Bearer ${$auth.accessToken}`
				}
			});

			if (response.ok) {
				entries = await response.json();
			} else {
				const data = await response.json();
				error = data.detail || 'Failed to fetch entries';
			}
		} catch (err) {
			error = 'Error fetching entries';
			console.error('Error:', err);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchEntries();
	});
</script>

<div class="space-y-6">
	{#if error}
		<div class="rounded-md bg-red-50 p-4">
			<div class="flex">
				<div class="flex-shrink-0">
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

	{#if loading}
		<div class="text-center">
			<div
				class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]"
			/>
			<p class="mt-2 text-sm text-gray-600">Loading entries...</p>
		</div>
	{:else if entries.length === 0}
		<div class="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
			<p class="text-sm text-gray-600">No entries yet. Start journaling to track your progress!</p>
		</div>
	{:else}
		<div class="space-y-4">
			{#each entries as entry (entry.id)}
				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<div class="mb-4 flex items-center justify-between">
						<p class="text-sm text-gray-600">
							{format(new Date(entry.created_at), 'MMMM d, yyyy')}
						</p>
						{#if entry.updated_at !== entry.created_at}
							<p class="text-xs text-gray-500">
								Edited {format(new Date(entry.updated_at), 'MMM d, yyyy')}
							</p>
						{/if}
					</div>
					<div class="space-y-4">
						<div>
							<h3 class="text-sm font-medium text-gray-700">What I worked on:</h3>
							<p class="mt-1 whitespace-pre-wrap text-gray-600">{entry.content}</p>
						</div>
						<div>
							<h3 class="text-sm font-medium text-gray-700">Concepts learned:</h3>
							<p class="mt-1 whitespace-pre-wrap text-gray-600">{entry.concepts_learned}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
