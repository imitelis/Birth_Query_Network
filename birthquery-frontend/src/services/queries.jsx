import axios from "axios";

// const baseUrl = "/";
const usersUrl = "/api/users";
const queriesUrl = "/api/queries";
const birthQueryUrl = "/api/birthquery";

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

export const commentQuery = async (comment) => {
  const config = {
    headers: { authorization: token },
  };
  const newComment = {
    text: comment.text,
    like_count: 0,
  };
  // console.log(queryId)
  const queryId = comment.query_id;
  return axios
    .post(`${queriesUrl}/${queryId}`, newComment, config)
    .then((res) => res.data);
};

// Axios PATCH

export const rebootQueries = async () => {
  const config = {
    headers: { authorization: token },
  };
  console.log(config);
  return axios
    .patch(`${queriesUrl}-reboot`, {}, config)
    .then((res) => res.data);
};

export const editQuery = async (query) => {
  const config = {
    headers: { authorization: token },
  };
  const queryId = query.query_id;
  const newQuery = {
    name: query.name,
    query_url: query.query_url,
    user_comment: query.user_comment,
  };
  return axios
    .patch(`${queriesUrl}/${queryId}`, newQuery, config)
    .then((res) => res.data);
};

// Axios DELETE

export const removeQuery = async (queryId) => {
  const config = {
    headers: { authorization: token },
  };
  return axios
    .delete(`${queriesUrl}/${queryId}`, config)
    .then((res) => res.data);
};

export const removeUser = async (userUuid) => {
  const config = {
    headers: { authorization: token },
  };
  return axios
    .delete(`${usersUrl}/${userUuid}`, config)
    .then((res) => res.data);
};

export const removeComment = async (comment) => {
  const config = {
    headers: { authorization: token },
  };
  const queryId = comment.query_id;
  const commentId = comment.id;
  return axios
    .delete(`${queriesUrl}/${queryId}/${commentId}`, config)
    .then((res) => res.data);
};
