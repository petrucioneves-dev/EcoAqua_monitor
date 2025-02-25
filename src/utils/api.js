import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json", // Garante que enviamos JSON
    Accept: "application/json", // Garante que aceitamos JSON na resposta
  },
});

export async function getSensor() {
  try {
    const response = await api.get("/sensors");
    console.log("Sensores:", response.data.data[response.data.data.length - 1]);
    return response.data.data[response.data.data.length - 1];
  } catch (error) {
    console.error("Erro ao buscar sensores:", error);
    throw error; // Para capturar o erro onde a função for chamada
  }
}
