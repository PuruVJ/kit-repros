# Svelte: hydrating a host element whose inside belongs to someone else

A plain SvelteKit 3.2 / Svelte 5.57 app. No other libraries.

```sh
npm install
npm run build
npx vite preview
```

## `/html-empty`: `{@html}` that is empty in the browser

```svelte
{@html browser ? '' : '<i>server-only markup</i>'}<b>{n}</b>
```

The server renders some markup that only it can produce, such as a web component's own server output. The browser should adopt whatever is between the `{@html}` markers, without needing the string a second time.

Instead, hydration throws:

```
HierarchyRequestError: Failed to execute 'appendChild' on 'Node': This node type does not support this method.
```

The page is dead (the button never works). When the client value is `''`, `{@html}` hydration seems to step over one node instead of skipping to its closing marker, so the walk lands on the server's `<i>` and desyncs.

## `/class-reset`: `class` on a custom element

`src/lib/x-badge.js` defines `<x-badge>`. When it connects, it adds a `hydrated` class to its own host, like many web component libraries do (their CSS often hides the host until it has that class).

```svelte
<x-badge class="badge">a static class</x-badge>
<x-badge class={on ? 'badge on' : 'badge'}>a dynamic class</x-badge>
```

After hydration both hosts have `class="badge"`. Svelte overwrote the whole `class`, so `hydrated` is gone, even for the static one. Toggling replaces it again (`badge on`, still no `hydrated`).
