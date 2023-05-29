import axios from "axios";

export const BackendUrl = "http://localhost:3000";

export const BackendApi = axios.create({
  baseURL: BackendUrl
});

export default BackendApi;
