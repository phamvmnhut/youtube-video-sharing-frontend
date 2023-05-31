import axios from "axios";

export const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3000";

export const BackendApi = axios.create({
  baseURL: BackendUrl
});

export default BackendApi;
