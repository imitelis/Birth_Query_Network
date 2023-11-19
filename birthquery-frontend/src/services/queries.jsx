import axios from "axios";

const queriesUrl = "/api/queries";
const usersUrl = "/api/users";
const birthQueryUrl = "/api/birthquery";

const baseUrl = "/";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// Axios GET

export const getQueries = async () => {
  const config = {
    headers: { authorization: token },
  };
  return axios.get(queriesUrl, config).then((res) => res.data);
};

export const getUsers = async () => {
  const config = {
    headers: { authorization: token },
  };
  return axios.get(usersUrl, config).then((res) => res.data);
};

export const getBirthQuery = async (birthQueryParams) => {
  const config = {
    headers: { authorization: token },
  };

  // console.log(`Request URL: ${birthQueryUrl}?${birthQueryParams}`);
  return axios
    .get(`${birthQueryUrl}${birthQueryParams}`, config)

    .then((res) => res.data);
};

// Axios POST

export const createQuery = async (newQuery) => {
  const config = {
    headers: { authorization: token },
  };
  return axios.post(queriesUrl, newQuery, config).then((res) => res.data);
};

export const deleteQuery = async (deletedQuery) => {
  const config = {
    headers: { authorization: token },
  };
  const id = deletedQuery.id;
  return axios.delete(`${queriesUrl}/${id}`, config).then((res) => res.data);
};

// Axios PATCH

export const rebootQueries = async () => {
  const config = {
    headers: { authorization: token },
  };
  return axios.patch(`${queriesUrl}-reboot`, config).then((res) => res.data);
};

export const deleteUser = async (userUuid) => {
  const config = {
    headers: { authorization: token },
  };
  const uuid = userUuid;
  return axios.delete(`${usersUrl}/${uuid}`, config).then((res) => res.data);
};

/* axios.patch */

export const updateQuery = async (updatedQuery) => {
  const config = {
    headers: { authorization: token },
  };
  const id = updatedQuery.id;
  return axios
    .put(`${baseUrl}/${id}`, updatedQuery, config)
    .then((res) => res.data);
};
