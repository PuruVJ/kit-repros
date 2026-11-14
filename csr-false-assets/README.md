# A csr = false page links CSS for a component it never rendered

Issue: [sveltejs/kit#17763](https://github.com/sveltejs/kit/issues/17763)

`src/routes/+page.svelte` is `csr = false`. It imports two components and renders only one. The other sits behind `{#if data.show}`, and `data.show` is `false`. That value is decided on the server for each request, the way a CMS or feature flag would be.

## Steps

```sh
npm install
npm run build
npx vite preview
curl -s http://localhost:4173/ | grep stylesheet
cat .svelte-kit/output/client/_app/immutable/assets/*.css
```

## Expected

The page links CSS for `Rendered.svelte` only. No client code runs on a `csr = false` page, so nothing can ever render `NeverRendered.svelte` there.

## Actual

The linked stylesheet holds the CSS for both components:

```css
.never.svelte-1pyzwy2{color:red;outline:10px solid red}.rendered.svelte-1kylriq{color:green}
```

The linked stylesheets come from the route's client module graph, not from what the server render used.
