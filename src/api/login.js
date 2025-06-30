import { API_BASE } from "./config";


export async function login(data) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error");
  }
  return res.json();
}

export async function getMe(token) {
    try {
        const res = await fetch(`${API_BASE}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
    } catch (error) {
        return error
    }
    
}