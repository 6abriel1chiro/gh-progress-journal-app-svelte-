<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import { format } from 'date-fns';
	import { Icon, Fire } from 'svelte-hero-icons';

	const today = new Date();
	const formattedDate = format(today, 'EEEE, MMMM d, yyyy');
	const currentStreak = 5; // This will be dynamic in the future
</script>

<div class="container mx-auto max-w-4xl p-4">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<p class="text-sm text-gray-600">{formattedDate}</p>
			<h1 class="text-3xl font-bold text-gray-900">Journal</h1>
		</div>
		<div class="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2">
			<Icon src={Fire} class="h-6 w-6 text-orange-500" />
			<span class="font-semibold text-orange-700">{currentStreak} day streak!</span>
		</div>
	</div>

	{#if $auth.isAuthenticated}
		<div class="space-y-6">
			<!-- Recent Entries Section -->
			<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h2 class="mb-4 text-xl font-semibold text-gray-800">Today's Entry</h2>
				<textarea
					class="h-40 w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
					placeholder="Write your thoughts for today..."
				>
				</textarea>
				<div class="mt-4 flex justify-end">
					<button
						class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
						>Save Entry</button
					>
				</div>
			</div>

			<!-- Previous Entries -->
			<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h2 class="mb-4 text-xl font-semibold text-gray-800">Previous Entries</h2>
				<div class="space-y-4">
					{#each Array(3) as _, i}
						<div class="border-b border-gray-200 pb-4 last:border-0">
							<p class="text-sm text-gray-600">
								{format(new Date().setDate(today.getDate() - i - 1), 'MMMM d, yyyy')}
							</p>
							<p class="mt-2 text-gray-800">Sample journal entry for day {i + 1}...</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
