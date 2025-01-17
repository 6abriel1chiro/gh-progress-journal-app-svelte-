<script lang="ts">
	import { auth } from '$lib/stores/auth';
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Profile</h1>
	{#if $auth.isAuthenticated}
		<p>You are logged in!</p>
	{/if}
</div>
