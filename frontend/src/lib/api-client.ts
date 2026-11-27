import { appConfig } from "@/lib/config";
import type { ApiErrorPayload, HealthStatus } from "@/types/api";

export class ApiClientError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(
    message: string,
    status: number,
    code = "api_error",
    details?: unknown,
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function buildApiUrl(path: string): string {
  const base = appConfig.apiBaseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildApiUrl(path), {
    ...init,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    let code = "http_error";
    let details: unknown;

    try {
      const payload = (await response.json()) as Partial<ApiErrorPayload>;
      if (payload.error) {
        message = payload.error.message || message;
        code = payload.error.code || code;
        details = payload.error.details;
      }
    } catch {
      // Ignore non-JSON error responses and fall back to status text.
    }

    throw new ApiClientError(message, response.status, code, details);
  }

  return (await response.json()) as T;
}

export function getHealthStatus(): Promise<HealthStatus> {
  return apiRequest<HealthStatus>("/health");
}
