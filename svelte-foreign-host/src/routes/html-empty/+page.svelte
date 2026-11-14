<script>
	import { browser } from '$app/environment';

	let n = $state(0);
</script>

<!--
  Server-only markup: the server renders it, the browser should adopt whatever is between
  the {@html} markers without needing the string again.
-->
<div>
	{@html browser ? '' : '<i>server-only markup</i>'}<b>{n}</b>
</div>
<button onclick={() => n++}>+1</button>
