<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import { Icon, Fire } from 'svelte-hero-icons';

	const userStats = {
		totalEntries: 42,
		currentStreak: 5,
		longestStreak: 14,
		joinedDate: new Date('2024-01-01')
	};
</script>

<div class="container mx-auto max-w-4xl p-4">
	<div class="rounded-lg border border-gray-200 bg-white shadow-sm">
		<div class="p-6">
			<div class="flex items-center gap-4">
				<Icon src={Icon} class="h-16 w-16 text-gray-400" />
				<div>
					<h1 class="text-2xl font-bold text-gray-900">Your Profile</h1>
					<p class="text-gray-600">@{$auth.isAuthenticated ? 'username' : 'loading...'}</p>
				</div>
			</div>

			<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<div class="rounded-lg bg-gray-50 p-4">
					<h3 class="text-sm text-gray-600">Total Entries</h3>
					<p class="text-2xl font-bold text-gray-900">{userStats.totalEntries}</p>
				</div>

				<div class="rounded-lg bg-orange-50 p-4">
					<div class="flex items-center gap-2">
						<Icon src={Fire} class="h-5 w-5 text-orange-500" />
						<h3 class="text-sm text-orange-600">Current Streak</h3>
					</div>
					<p class="text-2xl font-bold text-gray-900">{userStats.currentStreak} days</p>
				</div>

				<div class="rounded-lg bg-blue-50 p-4">
					<h3 class="text-sm text-blue-600">Longest Streak</h3>
					<p class="text-2xl font-bold text-gray-900">{userStats.longestStreak} days</p>
				</div>

				<div class="rounded-lg bg-green-50 p-4">
					<h3 class="text-sm text-green-600">Member Since</h3>
					<p class="text-2xl font-bold text-gray-900">
						{userStats.joinedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
