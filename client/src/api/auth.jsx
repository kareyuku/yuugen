import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

const registerUser = async ({ username, email, password }) => {
  try {
    const req = await api.post(`/users/create`, {
      username,
      email,
      password,
    });
    return req;
  } catch (err) {
    const msg = err?.response?.data?.message;
    if (msg) return { err: msg };
  }
};

const loginUser = async ({ username, password }) => {
  try {
    const req = await api.post(`/auth/login`, { username, password });
    return req.data;
  } catch (err) {
    return null;
  }
};

const userData = async () => {
  try {
    const req = await api.get(`/user`);
    return req.data;
  } catch (err) {
    return null;
  }
};

export { registerUser, loginUser, userData };
