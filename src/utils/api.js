import axios from "axios"

const BASE_URL = window.BASE_URL
// const BASE_URL = "http://192.168.43.48/tau-api"
const API = BASE_URL + "/api.php"
export const IMG_PATH = BASE_URL + "/images/"

export const getManage = async params => {
	const { data } = await axios.post(API, { action: 'GetManage', ...params })
	return data
}

export const getArticle = async params => {
	const { data } = await axios.post(API, { action: 'GetArticle', ...params })
	return data
}

export const postArticle = async params => {
	const { data } = await axios.post(API, { action: 'PostArticle', ...params })
	return data
}

export const getFacilities = async params => {
	const { data } = await axios.post(API, { action: 'GetFasilitas', ...params })
	return data
}

export const insertFacilities = async params => {
	const { data } = await axios.post(API, { action: 'InsertFasilitas', ...params })
	return data
}