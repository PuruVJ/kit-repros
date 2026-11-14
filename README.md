# Repros

Small apps, one per issue. Each one is a plain `sv create` minimal app (SvelteKit 3.2, Svelte 5.57), plus only the files needed to show the problem.

| Folder | Issue |
| --- | --- |
| [`csr-false-assets`](./csr-false-assets) | [sveltejs/kit#17763](https://github.com/sveltejs/kit/issues/17763) |
| [`remote-data-csr-false`](./remote-data-csr-false) | [sveltejs/kit#17764](https://github.com/sveltejs/kit/issues/17764) |
| [`client-started-signal`](./client-started-signal) | [sveltejs/kit#17765](https://github.com/sveltejs/kit/issues/17765) |
| [`rolldown-strict-order`](./rolldown-strict-order) | [rolldown/rolldown#11702](https://github.com/rolldown/rolldown/issues/11702) |
| [`svelte-foreign-host`](./svelte-foreign-host) | Svelte: hydrating a host whose inside belongs to someone else |

To run one, go into its folder:

```sh
npm install
npm run build
npx vite preview
```
