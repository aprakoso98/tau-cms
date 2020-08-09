const toBase64 = files => {
	const promises = []
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		promises.push(
			new Promise((res, rej) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => res({
					name: file.name,
					image: reader.result
				});
				reader.onerror = error => rej(error);
			})
		)
	}
	if (promises.length === 1)
		return promises[0]
	return Promise.all(promises)
}

export default toBase64