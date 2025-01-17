<script lang="ts">
	import NewEntry from '../components/NewEntry.svelte';
	import { auth } from '$lib/stores/auth';
</script>

{#if $auth.isAuthenticated}
	<NewEntry />
{:else}
	<h1>Please log in to continue</h1>
	<a href="/login" class="text-blue-600 hover:underline">Login</a>
{/if}
