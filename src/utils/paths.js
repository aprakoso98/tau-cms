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

String.prototype.validURL = function () {
	var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
	return !!pattern.test(this);
}

export const substr = (txt = '', length) => txt ? txt.length > length ? `${txt.substr(0, length)}...` : txt : ''