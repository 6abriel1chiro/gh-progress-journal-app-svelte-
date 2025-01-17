import { auth } from '$lib/stores/auth';
import { get } from 'svelte/store';

export function checkAuthStatus(): boolean {
	const authState = get(auth);
	return authState.isAuthenticated && !!authState.accessToken;
}

export async function refreshToken(): Promise<boolean> {
	const authState = get(auth);
	if (!authState.refreshToken) return false;

	try {
		const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ refresh: authState.refreshToken })
		});

		if (response.ok) {
			const data = await response.json();
			auth.login({ access: data.access, refresh: authState.refreshToken });
			return true;
		}
		return false;
	} catch {
		return false;
	}
}
