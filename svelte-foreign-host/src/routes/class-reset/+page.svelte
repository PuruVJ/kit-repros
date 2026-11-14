<script>
	import '#lib/x-badge.js';
	let on = $state(false);
</script>

<x-badge class="badge">a static class</x-badge>
<x-badge class={on ? 'badge on' : 'badge'}>a dynamic class</x-badge>
<button onclick={() => (on = !on)}>toggle</button>
