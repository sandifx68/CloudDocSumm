// src/services/http/client.ts
import { getAccessToken } from "./auth";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
};

export async function http<T>(
  path: string,
  { method = "GET", headers = {}, body}: RequestOptions = {}
): Promise<T> {
  const token = await getAccessToken();
  const base = import.meta.env.VITE_API_BASE_URL;
  const hdrs: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };
  if (!(body instanceof FormData)) {
    hdrs["Content-Type"] = "application/json";
  }

  const res = await fetch(`${base}${path}`, {
    method,
    headers: hdrs,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined
  });

  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    const ct = res.headers.get("content-type") || "";
    try {
      if (ct.includes("application/json")) {
        const j = await res.json();
        message = j?.message || j?.error || message;
      } else {
        const t = await res.text();
        if (t) message = t;
      }
    } catch {
      // Intentionally ignore JSON/text parsing errors; fallback to default message
    }
    throw new Error(message);
  }

  // handle empty bodies (204)
  if (res.status === 204) return undefined as T;

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return (await res.json()) as T;
  // fallback if backend sends text
  return (await res.text()) as unknown as T;
}
