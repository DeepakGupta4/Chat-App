import axios from "axios";

const instance = axios.create({
  baseURL: "https://chat-app-5-fhsa.onrender.com",
  withCredentials: true
});

export default instance;
