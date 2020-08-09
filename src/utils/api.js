import axios from "axios"

const BASE_URL = "http://localhost/tau-api"
const API = BASE_URL + "/api.php"

export const getArticle = async params => {
	const { data } = await axios.post(API, { action: 'GetArticle', ...params })
	return data
}

export const postArticle = async params => {
	const { data } = await axios.post(API, { action: 'PostArticle', ...params })
	return data
}