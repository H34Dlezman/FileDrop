<script>
	import { goto } from '$app/navigation';
	import Clipboard from 'svelte-clipboard';
	import { name, url } from '../store.js';

	let fileName = ""
	let fileURL = ""

	url.subscribe(u => {
		fileURL = u;
	});
	name.subscribe(n => {
		fileName = n;
	});

	function copy() {
	}

</script>

<page>
	<a href="/" class="title">FileDrop</a>

	<a href={fileURL}>{fileName||""}</a>
	<Clipboard
	text={fileURL}
	let:copy>
		<button on:click={copy}>Copy</button>
	</Clipboard>
</page>

<style>
</style>