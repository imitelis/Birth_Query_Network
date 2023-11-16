import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/signup";

const createUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default createUser;
