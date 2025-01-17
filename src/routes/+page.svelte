<script lang="ts">
	import NewEntry from '../components/NewEntry.svelte';
	import { auth } from '$lib/stores/auth';
	import { format } from 'date-fns';

	const today = new Date();
	const formattedDate = format(today, 'EEEE, MMMM d, yyyy');
</script>

{#if $auth.isAuthenticated}
	<div class="container mx-auto max-w-4xl p-4">
		<div class="mb-8">
			<p class="text-sm text-gray-600">New Journal Entry</p>
			<h1 class="text-3xl font-bold text-gray-900">{formattedDate}</h1>
		</div>
		<NewEntry />
	</div>
{:else}
	<div class="container mx-auto max-w-4xl p-4 text-center">
		<h1 class="mb-4 text-2xl font-bold text-gray-900">Welcome to Progress Journal</h1>
		<p class="mb-6 text-gray-600">Please log in to start journaling your learning progress.</p>
		<a href="/login" class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Login</a>
	</div>
{/if}
