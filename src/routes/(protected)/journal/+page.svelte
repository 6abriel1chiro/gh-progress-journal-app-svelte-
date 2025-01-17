<script lang="ts">
	import NewEntry from '../../../components/NewEntry.svelte';
	import EntriesList from '../../../components/EntriesList.svelte';
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

	<div class="space-y-8">
		<NewEntry />
		<EntriesList />
	</div>
</div>
