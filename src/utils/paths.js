import { FILE_PATH } from './api';

String.prototype.replacePath = function (toPath) {
	const path = '$FILE_PATH'
	if (toPath) {
		const regex = new RegExp(path, 'g')
		return this.replace(regex, FILE_PATH)
	}
	const regex = new RegExp(FILE_PATH, 'g')
	return this.replace(regex, path)
}