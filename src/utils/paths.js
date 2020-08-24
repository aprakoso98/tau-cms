import { FILE_PATH } from './api';

// eslint-disable-next-line no-extend-native
String.prototype.replacePath = function (toPath) {
	if (toPath) {
		return this.replace(/\$FILE_PATH/g, FILE_PATH)
	}
	const regex = new RegExp(FILE_PATH, 'g')
	return this.replace(regex, '$FILE_PATH')
}
