const API_URL = "/api";
export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
  return response.json() as Promise<T>;
}
