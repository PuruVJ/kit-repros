import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		{
			name: 'repro:strict-execution-order',
			configEnvironment(name) {
				// Only the server build gets the option. REPRO_OFF=1 builds without it.
				if (name !== 'ssr' || process.env.REPRO_OFF === '1') return;
				return { build: { rollupOptions: { output: { strictExecutionOrder: true } } } };
			}
		},
		sveltekit()
	]
});
