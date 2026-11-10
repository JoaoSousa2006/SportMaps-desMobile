const API_URL = "/api";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || `Erro HTTP: ${response.status}`);
  return body as T;
}

export function apiGet<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint);
}

export function apiPost<T>(endpoint: string, body?: unknown): Promise<T> {
  return request<T>(endpoint, { method: "POST", body: JSON.stringify(body ?? {}) });
}

export function apiPut<T>(endpoint: string, body: unknown): Promise<T> {
  return request<T>(endpoint, { method: "PUT", body: JSON.stringify(body) });
}
