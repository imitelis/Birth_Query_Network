import axios from "axios";

const queriesUrl = "http://127.0.0.1:8000/queries";
const usersUrl = "http://127.0.0.1:8000/users";
const baseUrl = "/";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

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

export const createQuery = async (newQuery) => {
  const config = {
    headers: { authorization: token },
  };
  return axios.post(baseUrl, newQuery, config).then((res) => res.data);
};

export const deleteQuery = async (deletedQuery) => {
  const config = {
    headers: { authorization: token },
  };
  const id = deletedQuery.id;
  return axios.delete(`${baseUrl}/${id}`, config).then((res) => res.data);
};

export const updateQuery = async (updatedQuery) => {
  const config = {
    headers: { authorization: token },
  };
  const id = updatedQuery.id;
  return axios
    .put(`${baseUrl}/${id}`, updatedQuery, config)
    .then((res) => res.data);
};
