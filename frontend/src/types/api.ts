export interface HealthStatus {
  status: string;
  app: string;
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiErrorPayload {
  error: ApiErrorDetail;
}
