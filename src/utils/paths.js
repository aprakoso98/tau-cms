import { FILE_PATH } from './api';

/* eslint-disable */
String.prototype.replacePath = function (toPath) {
	if (toPath) {
		return this.replace(/\$FILE_PATH/g, FILE_PATH)
	}
	const regex = new RegExp(FILE_PATH, 'g')
	return this.replace(regex, '$FILE_PATH')
}

String.prototype.uuid = function () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & (0x3 | 0x8))
		return v.toString(16)
	})
}