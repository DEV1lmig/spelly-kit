import PocketBase from 'pocketbase';
import { SECRET_EMAIL, SECRET_PASSWORD } from '$env/static/private';

export const handle = async ({ event, resolve }) => {
	const adminPb = new PocketBase('https://spelly.pockethost.io');
	const userPb = new PocketBase('https://spelly.pockethost.io');

	await adminPb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
	event.locals.adminPb = adminPb;
	event.locals.userPb = userPb;

	event.locals.userPb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	try {
		event.locals.userPb.authStore.isValid &&
			(await event.locals.userPb.collection('users').authRefresh());
		event.locals.user = { ...event.locals.userPb.authStore.model };
	} catch (err) {
		if (err.status !== 401) {
			console.error('Error refreshing user authentication:', err);
		} else {
			console.log('User authentication token is invalid (expected during logout)');
		}
		event.locals.userPb.authStore.clear();
	}
	const response = await resolve(event);
	response.headers.set('set-cookie', event.locals.userPb.authStore.exportToCookie());
	return response;
};
