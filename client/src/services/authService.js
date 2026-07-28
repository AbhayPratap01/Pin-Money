import api from "./api";

export async function registerUser(payload) {
  const response = await api.post("/api/register", payload);
  return response.data;
}

export async function loginUser(payload) {
  const response = await api.post("/api/login", payload);
  return response.data;
}

export async function getProfile() {
  const response = await api.get("/api/profile");
  return response.data;
}
