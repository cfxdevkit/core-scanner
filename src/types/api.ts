export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ESpaceApiResponse<T> {
  status: string;
  message: string;
  result: T;
}

export interface FormattedResponse<T, F = string> {
  raw: T;
  formatted: F;
}

export type ConfluxTarget = "mainnet" | "testnet";

export interface ApiConfig {
  target?: ConfluxTarget;
  apiKey?: string;
  host?: string;
}
