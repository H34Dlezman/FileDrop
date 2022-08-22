<script>
	import { goto } from '$app/navigation';
	import Dropzone from 'svelte-file-dropzone';
	import { name, file, password } from './store.js';
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
		password.set(filePassword)
		goto("/upload")

	}


	let fileDrop = null
	let fileName = ""
	let filePassword = ""
	let fileNameInput
</script>


<page>
	<a class="title">FileDrop</a>

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

	<!-- <input type="text" name="password" disabled={fileDrop==null} bind:value={filePassword} placeholder="passwort?"> -->


	<a href="/delete">
		löschen?
	</a>
</page>