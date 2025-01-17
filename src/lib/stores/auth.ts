import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface AuthState {
	isAuthenticated: boolean;
	accessToken: string | null;
	refreshToken: string | null;
}

const defaultState: AuthState = {
	isAuthenticated: false,
	accessToken: null,
	refreshToken: null
};

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(defaultState);

	return {
		subscribe,
		login: (tokens: { access: string; refresh: string }) => {
			if (browser) {
				localStorage.setItem('accessToken', tokens.access);
				localStorage.setItem('refreshToken', tokens.refresh);
			}
			set({
				isAuthenticated: true,
				accessToken: tokens.access,
				refreshToken: tokens.refresh
			});
		},
		logout: () => {
			if (browser) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
			}
			set(defaultState);
		},
		initialize: () => {
			if (browser) {
				const accessToken = localStorage.getItem('accessToken');
				const refreshToken = localStorage.getItem('refreshToken');
				if (accessToken && refreshToken) {
					set({
						isAuthenticated: true,
						accessToken,
						refreshToken
					});
				}
			}
		}
	};
}

export const auth = createAuthStore();
