<script>
	import NeverRendered from '#lib/NeverRendered.svelte';
	import Rendered from '#lib/Rendered.svelte';

	let { data } = $props();
</script>

<h1>csr = false</h1>
<Rendered />
{#if data.show}
	<NeverRendered />
{/if}
