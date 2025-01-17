import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/stores/auth';
import type { LayoutLoad } from './$types';

export const load = (async () => {
	const unsubscribe = auth.subscribe((authState) => {
		if (!authState.isAuthenticated) {
			throw redirect(307, '/login');
		}
	});
	unsubscribe();

	return {};
}) satisfies LayoutLoad;
