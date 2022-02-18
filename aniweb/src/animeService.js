import axios from 'axios'
const baseUrl = "/api/animelist";
const newsUrl = "/api/news";
const loginUrl = '/login/';
const userUrl = "/api/users";

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response)
}

const getUser = () => {
  const request = axios.get(userUrl)

  return request.then(response => response)
}

const getUserId = async (id) => {
  if (typeof id == 'undefined') {
    return;
  }
  const response = await axios.get(`${userUrl}/${id}`);
  return response.data;
}

const getAnimeId = async (id) => {
  if (typeof id == 'undefined') {
    return;
  }
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

const getNewsId = async (id) => {
  const response = await axios.get(`${newsUrl}/${id}`);
  return response.data;
}

const getAllN = () => {
  const request = axios.get('/api/animelist/news')

  return request.then(response => response)
}

const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

const createUser = async newObject => {

  const response = await axios.post(userUrl, newObject)

  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const createNews = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(newsUrl, newObject, config)
  return response.data
}


const update = async (id, newObject) => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const updateN = async (id, newObject) => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${newsUrl}/${id}`, newObject, config)
  return response.data
}

const updateP = async (id, newObject) => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${userUrl}/${id}`, newObject, config)
  return response.data
}

const del = async (id, user) => {
  const config = {
    headers: { Authorization: token, user_id: user }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const delN = async (id, user) => {
  const config = {
    headers: { Authorization: token, user_id: user }
  }
  await axios.delete(`${newsUrl}/${id}`, config)
}


export default { getAll, login, create, createNews, createUser, setToken, update, del, getUser, delN, updateN, updateP, getAllN, getUserId, getAnimeId, getNewsId }