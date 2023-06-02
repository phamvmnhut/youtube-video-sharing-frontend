import axios from "axios";

export const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3000";
export const BackendUrlServer = process.env.BACKEND_API_URL || "http://rails:3000";

export const BackendApi = axios.create({
  baseURL: BackendUrl
});

export const BackendApiServer = axios.create({
  baseURL: BackendUrlServer
});

export default BackendApi;
