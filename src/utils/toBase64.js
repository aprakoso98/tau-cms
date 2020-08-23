const toBase64 = files => {
	const promises = []
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		promises.push(
			new Promise((res, rej) => {
				const reader = new FileReader();
				const split = file.name.split('.')
				const format = split[split.length - 1]
				split.splice(split.length - 1, 1)
				const name = split.join('')
				reader.readAsDataURL(file);
				reader.onload = () => res({
					name,
					format,
					file: reader.result,
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