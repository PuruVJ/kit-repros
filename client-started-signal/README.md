# No public signal that Kit's client has started

Issue: [sveltejs/kit#17765](https://github.com/sveltejs/kit/issues/17765)

`src/lib/nav-button.js` defines a custom element, `<page-badge>`, that reads `page` from `$app/state`. It is used in `src/routes/+page.svelte`, and the page's `load` returns `{ user: 'ada' }`.

## Steps

```sh
npm install
npm run build
npx vite preview
```

Open http://localhost:4173/ and look at the console.

## What happens

```
[page-badge] connected: status=-1 url= data={}
```

The element upgrades when its module runs. That happens during Kit's client start, before the first page is applied. At that moment `page` is only a placeholder: `status` is `-1`, there is no URL, and there is no data. The badge keeps showing `status -1`.

Code inside Kit's component tree can use `onMount` or `afterNavigate`. Code outside it (custom elements, plain scripts, analytics) has no public way to wait until the client has started and `page` holds the real page. The only tell today is `page.status === -1`, which is an internal detail.

A `sveltekit:start` window event used to exist, and was removed in [sveltejs/kit#6484](https://github.com/sveltejs/kit/pull/6484). An event also has a catch: code that loads after it fired never hears it. Something you can read at any time, like a promise or a flag, would avoid that.
