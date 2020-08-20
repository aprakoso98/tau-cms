import axios from "axios"

const { BASE_URL } = require('src/env.json')

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

export const updateGambar = async params => {
	const { data } = await axios.post(API, { action: 'UpdateGambar', ...params })
	return data
}

export const getGambar = async params => {
	const { data } = await axios.post(API, { action: 'GetGambar', ...params })
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

