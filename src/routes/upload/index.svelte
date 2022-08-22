<script>
	import { goto } from '$app/navigation';
	import { toBase64 } from '$lib/'
	import CryptoJS from 'crypto-js';
	import { name, file, password, url } from '../store.js';

	let fileDrop = null
	let fileName = null
	let filePassword = null

	file.subscribe(f => {
		fileDrop = f;
	});
	name.subscribe(n => {
		fileName = n;
	});
	password.subscribe(p => {
		filePassword = p;
	});

	async function upload() {
		if (fileDrop==null || fileName==null || filePassword==null) {
			return;
		}
		console.log("start Upload", fileDrop)
		var fileData = await toBase64(fileDrop)

		if (filePassword!="") {
			fileData = encrypt(fileData)
		}
		
		let data = JSON.stringify({
			file: fileData,
			name: fileName
		});

		let request = new XMLHttpRequest();
		request.open('POST', '/api'); 
		request.setRequestHeader("Content-Type", fileDrop.type);


		// upload progress event
		request.upload.addEventListener('progress', function(e) {
			let uploadProgress = (e.loaded / e.total)*100;
  			(new ldBar("#ldBar")).set(uploadProgress);
		});

		// request finished event
		request.addEventListener('load', function(e) {
			let json = JSON.parse(request.response)
			console.log(request.status);
			console.log(json);
			if (request.status!=200) {
				alert("upload error 💥")
				return;
			}
			url.set(
				(filePassword? 
					"https://filedrop.frty.de/file?key=" :
					"https://vifz.it/") 
				+ (new URL(json.location).pathname).slice(5)
				)
			goto("/upload/fin")
		});
		request.send(data);

	}

	function encrypt(data) {
		return CryptoJS.AES.encrypt(data, filePassword).toString()
	}


	setTimeout(upload, 500)
</script>

<page>
	<a href="/" class="title">FileDrop</a>

	<h2>{fileName||""}</h2>
	<h3>{fileDrop?Math.floor(fileDrop.size/1024/1024*100)/100.0+" MB":""}</h3>

	<div id="ldBar" data-preset="rainbow" style="width: 100%; height: 240px;" class="ldBar label-center" data-value={"0"} >
	</div>
</page>

<style>
</style>