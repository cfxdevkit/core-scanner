/**
 * @packageDocumentation
 * Base type definitions used across the Conflux Core Scanner SDK.
 * Contains core types for API configuration and responses.
 * @module types/base
 * @category Types
 */

/**
 * Conflux network target types.
 * Specifies which network environment to interact with.
 *
 * @public
 * @category Types
 */
export type ConfluxTarget = "mainnet" | "testnet";

/**
 * API configuration options.
 * Contains settings for connecting to the Conflux Core Scanner API.
 *
 * @public
 * @category Types
 */
export interface ApiConfig {
  /** Target network environment */
  target: ConfluxTarget;
  /** API key for authentication */
  apiKey?: string;
  /** Custom API host URL */
  host?: string;
}

/**
 * Generic API Response type used across all endpoints.
 * Wraps the response data with status information.
 *
 * @public
 * @category Types
 */
export interface ApiResponse<T> {
  /** Response status code */
  code: number;
  /** Response status message or error description */
  message: string;
  /** API response result data */
  data: T;
}
