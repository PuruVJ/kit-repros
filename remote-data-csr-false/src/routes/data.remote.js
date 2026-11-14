import { query } from '$app/server';

let calls = 0;

export const getGreeting = query(async () => {
	calls += 1;
	return { text: 'hello from the server', calls };
});
