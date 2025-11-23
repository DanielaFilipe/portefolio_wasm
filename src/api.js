// src/api.js
const API_URL = "http://localhost:5000";

export async function getStudent() {
  const res = await fetch(`${API_URL}/api/student`);

  if (!res.ok) {
    throw new Error("Erro ao obter dados do estudante");
  }

  return await res.json();
}
