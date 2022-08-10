<script>
	import { goto } from '$app/navigation';
	import Dropzone from 'svelte-file-dropzone';
	import { name, file } from './store.js';
	import { toBase64 } from '$lib/'

	function handleFilesSelect(e) {
		const { acceptedFiles } = e.detail;
		fileDrop = acceptedFiles[0]
		fileName = fileDrop.name
		fileNameInput.focus()
	}

	async function upload() {
		file.set(fileDrop)
		name.set(fileName)
		goto("/upload")

	}


	let fileDrop = null
	let fileName = ""
	let fileNameInput
</script>


<page>
	<h1>FileDrop</h1>

	<Dropzone on:drop={handleFilesSelect} containerClasses="fileDrop dropzone" disableDefaultStyles>
		CLICK or Drop File
	</Dropzone>

	<button disabled={fileDrop==null} on:click={upload}>
		Upload
	</button>

	<input type="text" name="fileName" disabled={fileDrop==null} bind:value={fileName} bind:this={fileNameInput}>

	<h3>{fileDrop?
	`${Math.floor(fileDrop.size/1024/1024*100.0)/100.0} MB`
	:""}</h3>
</page>