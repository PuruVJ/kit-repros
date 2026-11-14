<script>
	import { getGreeting } from '../data.remote.js';
</script>

<h1>csr = true</h1>
<p>{(await getGreeting()).text}</p>
