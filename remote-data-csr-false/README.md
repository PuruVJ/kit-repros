# Remote query results are not in the page when csr = false

Issue: [sveltejs/kit#17764](https://github.com/sveltejs/kit/issues/17764)

`/csr-true` and `/csr-false` both render the same remote query (`src/routes/data.remote.js`) during SSR. The only difference between them is `csr`.

## Steps

```sh
npm install
npm run build
npx vite preview
curl -s http://localhost:4173/csr-true  | grep -c 'hello from the server'   # 2
curl -s http://localhost:4173/csr-false | grep -c 'hello from the server'   # 1
```

## What happens

On `/csr-true`, Kit writes the result into the page, so the client's query cache starts warm:

```js
__sveltekit_xxxx.data = {q:{"mxe8u8/getGreeting/":{v:{text:"hello from the server",calls:1}}}};
```

On `/csr-false`, the result is dropped. That is correct when nothing on the page runs. But `csr = false` pages often still run some code: a web component, a widget, or a partly hydrated area. When that code calls the same query, it fetches it again. While it waits, it shows a loading state for data the server already had.

There is no public way to get those results on the server, or to seed the client cache with them.
