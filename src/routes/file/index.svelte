<script>
	import CryptoJS from "crypto-js";
	
	
	function decrypt() {
		const bytes = CryptoJS.AES.decrypt(data, password);
		const originalText = bytes.toString(CryptoJS.enc.Utf8);
		return originalText;
	}

	let password=""
</script>

<page>
	<input type="password" name="password" bind:value={password} placeholder="Password" />
	<button on:click={decrypt}>Download</button>
</page>