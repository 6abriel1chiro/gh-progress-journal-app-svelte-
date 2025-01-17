<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	onMount(() => {
		auth.initialize();
	});

	async function handleLogout() {
		auth.logout();
		await goto('/login');
	}
</script>

<nav>
	<div class="nav-content">
		<a href="/">Home</a>
		{#if $auth.isAuthenticated}
			<div class="flex gap-4">
				<a href="/profile">Profile</a>
				<a href="/journal">Journal</a>
				<button on:click={handleLogout}>Logout</button>
			</div>
		{:else}
			<div class="flex gap-4">
				<a href="/login">Login</a>
				<a href="/register">Sign up</a>
			</div>
		{/if}
	</div>
</nav>

<main>
	<slot />
</main>
