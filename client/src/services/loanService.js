import api from "./api";

export async function applyForLoan(payload) {
  const response = await api.post("/api/loans", payload);
  return response.data;
}

export async function getLoanApplications() {
  const response = await api.get("/api/loans");
  return response.data;
}

export async function checkCibilScore(payload) {
  const response = await api.post("/api/cibil", payload);
  return response.data;
}
