export const toBase64 = file => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		var base64String = reader.result
		resolve(base64String.split(';base64,').pop()) 
	};
	reader.onerror = error => reject(error);
});