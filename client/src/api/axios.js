import axios from "axios";

const HOST = import.meta.env.VITE_API_URL;
const PORT = import.meta.env.VITE_API_PORT;

const instance = axios.create({
  baseURL: `${HOST}/api`,
  withCredentials: true,
});

export default instance;
