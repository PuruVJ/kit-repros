<script>
	import { getGreeting } from '../data.remote.js';
</script>

<h1>csr = false</h1>
<p>{(await getGreeting()).text}</p>
<!--
  A widget on this page (a web component, a script loaded with <script src>) that calls
  the same remote query in the browser cannot reuse the result the server already has:
  it is not in the page, so the query is fetched again.
-->
