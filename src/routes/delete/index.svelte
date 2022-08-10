<script>
	import { goto } from '$app/navigation';

	function deleteFile() {
		let key = fileURL.slice(fileURL.indexOf("vifz.it/")+8)
		fetch("/api/delete", {
            method: "POST",
            body: JSON.stringify({key})
        },)
        fileURL = ""
        alert("tahnkiU")
	}

	let fileURL = ""
</script>

<page>
	<a href="/" class="title">FileDrop</a>

	<input type="text" name="fileURL" placeholder="File URL" bind:value={fileURL} />

	<button disabled={fileURL==""} on:click={deleteFile}>
	Delete
	</button>
</page>

<style>
</style>