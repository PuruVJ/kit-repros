# `strictExecutionOrder` deadlocks on a SvelteKit 2 server build

A bare SvelteKit 2.70.4 app (one page, `adapter-node`). The only change from a default app is `output.strictExecutionOrder: true` on the SSR environment (`vite.config.ts`).

## Steps

```sh
npm install
REPRO_OFF=1 npx vite build   # without the option: builds fine
npx vite build               # with it: never finishes
```

## What happens

The build stops at 0% CPU during Kit's post-build analysis, which imports the server output. Nothing is printed and it never exits.

Versions: rolldown 1.2.19 (through vite 8.3.8), @sveltejs/kit 2.70.4, @sveltejs/adapter-node 5. SvelteKit 3.2 with the same option builds fine.

## Why it seems to happen

- Rolldown emits **async** init wrappers (`__esmMin` returning promises) for 16 of Kit's server runtime modules. No module in the source or the output has a top-level `await`. The deepest one is `@sveltejs/kit/src/runtime/server/utils.js`, whose body awaits nothing.
- Kit's server runtime has an import cycle: `respond.js` → `page/index.js` → `load_data.js` → `fetch.js` → `respond.js`.
- With async wrappers, `init_fetch` awaits `init_respond`'s promise while `init_respond` is still awaiting its way down to `init_fetch`. Neither settles, and the `Server` class module (`server/index.js`) awaits `init_respond` forever.
- Patching the `__esmMin` helper to record every init that returns a promise shows exactly these three still pending after 3 s.

A small 4-module cycle *with* a top-level `await` (or with a dynamic import into the cycle) runs fine with the same options. So whatever makes Rolldown mark Kit 2's modules async is specific to that graph, and it isn't narrowed further here.
