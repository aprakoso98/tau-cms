import axios from "axios"

const { BASE_URL } = require('src/env.json')

const API = BASE_URL + "/api.php"
export const FILE_PATH = BASE_URL + "/files/"

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

export const editArticle = async params => {
	const { data } = await axios.post(API, { action: 'EditArticle', ...params })
	return data
}

export const removeArticle = async params => {
	const { data } = await axios.post(API, { action: 'RemoveArticle', ...params })
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

export const insertProgramStudi = async params => {
	const { data } = await axios.post(API, { action: 'InsertProgramStudi', ...params })
	return data
}

export const getProgramStudi = async params => {
	const { data } = await axios.post(API, { action: 'GetProgramStudi', ...params })
	return data
}

export const getProgramStudiKategori = async params => {
	const { data } = await axios.post(API, { action: 'GetProgramStudiKategori', ...params })
	return data
}

export const updateFile = async params => {
	const { data } = await axios.post(API, { action: 'UpdateFile', ...params })
	return data
}

export const getFiles = async params => {
	const { data } = await axios.post(API, { action: 'GetFiles', ...params })
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

export const insertS1Kategori = async params => {
	const { data } = await axios.post(API, { action: 'InsertS1Kategori', ...params })
	return data
}

export const insertS1 = async params => {
	const { data } = await axios.post(API, { action: 'InsertS1', ...params })
	return data
}

export const updateS1 = async params => {
	const { data } = await axios.post(API, { action: 'UpdateS1', ...params })
	return data
}

export const getBanner = async params => {
	const { data } = await axios.post(API, { action: 'GetBanner', ...params })
	return data
}

export const updateBanner = async params => {
	const { data } = await axios.post(API, { action: 'UpdateBanner', ...params })
	return data
}

export const getArticleSet = async params => {
	const { data } = await axios.post(API, { action: 'GetArticleSet', ...params })
	return data
}

export const setArticleSet = async params => {
	const { data } = await axios.post(API, { action: 'SetArticleSet', ...params })
	return data
}

export const getAdvisors = async params => {
	const { data } = await axios.post(API, { action: 'GetAdvisors', ...params })
	return data
}

export const insertAdvisors = async params => {
	const { data } = await axios.post(API, { action: 'InsertAdvisors', ...params })
	return data
}

export const hideAdvisors = async params => {
	const { data } = await axios.post(API, { action: 'HideAdvisors', ...params })
	return data
}
