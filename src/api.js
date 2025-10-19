// src/api.js
// ✅ Fully functional API helper for Foundify ✨ frontend

const API_BASE =
  import.meta.env.VITE_API_URL || "https://foundify-backend.onrender.com";

// Debug check
console.log("🌍 Foundify Frontend connected to:", API_BASE);

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("foundify_token");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
    credentials: "include",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ API error:", res.status, text);
    throw new Error(`API error: ${res.status} ${text}`);
  }

  return res.json();
}
