import axios from "axios"

const BASE_URL = "https://api-cms.kadetech.tech"
// const BASE_URL = "http://127.0.0.1/tau-api"

const API = BASE_URL + "/api.php"
export const IMG_PATH = BASE_URL + "/images/"
export const IMG_ARTICLE = IMG_PATH + "article/"

export const getManage = async params => {
	const { data } = await axios.post(API, { action: 'GetManage', ...params })
	return data
}

export const updateManage = async params => {
	const { data } = await axios.post(API, { action: 'UpdateManage', ...params })
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

export const getStaff = async params => {
	const { data } = await axios.post(API, { action: 'GetStaff', ...params })
	return data
}

export const insertStaff = async params => {
	const { data } = await axios.post(API, { action: 'InsertStaff', ...params })
	return data
}

export const getGaleri = async params => {
	const { data } = await axios.post(API, { action: 'GetGaleri', ...params })
	return data
}

export const insertGaleri = async params => {
	const { data } = await axios.post(API, { action: 'InsertGaleri', ...params })
	return data
}

export const insertS1 = async params => {
	const { data } = await axios.post(API, { action: 'InsertS1', ...params })
	return data
}

export const getS1 = async params => {
	const { data } = await axios.post(API, { action: 'GetS1', ...params })
	return data
}

export const getS1Kategori = async params => {
	const { data } = await axios.post(API, { action: 'GetS1Kategori', ...params })
	return data
}

export const updateGambar = async params => {
	const { data } = await axios.post(API, { action: 'UpdateGambar', ...params })
	return data
}

export const getGambar = async params => {
	const { data } = await axios.post(API, { action: 'GetGambar', ...params })
	return data
}