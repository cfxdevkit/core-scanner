export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export type ConfluxTarget = "mainnet" | "testnet";

export interface ApiConfig {
  target?: ConfluxTarget;
  apiKey?: string;
  host?: string;
}

export interface FormattedResponse<T, F = T> {
  raw: T;
  formatted: F;
}
