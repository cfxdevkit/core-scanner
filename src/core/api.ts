/**
 * @packageDocumentation
 * Core API module for the Conflux Core Scanner SDK.
 * This file contains the base API class that handles HTTP requests to the Conflux Core API.
 * @module core/api
 */

import { ApiConfig, ApiResponse } from "../types";
import { createLogger } from "../utils/logger";

/**
 * Base API class for making HTTP requests to the Conflux Core API.
 * Provides common functionality for API endpoints including request handling and error management.
 *
 * @class CoreApi
 */
export class CoreApi {
  /** Base URL for the API endpoints */
  protected baseUrl: string;
  /** Optional API key for authenticated requests */
  protected apiKey?: string;
  /** Logger instance for debugging and error tracking */
  protected logger = createLogger("CoreApi");

  /**
   * Creates an instance of CoreApi.
   * @param {ApiConfig} config - Configuration object for the API
   * @param {string} [config.target="mainnet"] - Target network ("mainnet" or "testnet")
   * @param {string} [config.apiKey] - Optional API key for authenticated requests
   * @param {string} [config.host] - Optional custom host URL
   */
  constructor({ target = "mainnet", apiKey, host }: ApiConfig = { target: "mainnet" }) {
    const defaultMainnetHost = "https://api.confluxscan.io";
    const defaultTestnetHost = "https://api-testnet.confluxscan.io";
    const defaultHost = target === "mainnet" ? defaultMainnetHost : defaultTestnetHost;
    this.baseUrl = host || defaultHost;
    this.apiKey = apiKey;
    this.logger.debug({ target, host: this.baseUrl }, "API instance initialized");
  }

  /**
   * Makes an API request with the given parameters.
   * Handles parameter sanitization, API key inclusion, and error handling.
   *
   * @protected
   * @template T - Type of the expected response data
   * @param {string} endpoint - API endpoint to call
   * @param {Record<string, string | number | boolean | null | undefined>} params - Query parameters
   * @returns {Promise<ApiResponse<T>>} Promise resolving to the API response
   * @throws {Error} When the API request fails or returns an error status
   */
  protected async fetchApi<T>(
    endpoint: string,
    params: Record<string, string | number | boolean | null | undefined> = {}
  ): Promise<ApiResponse<T>> {
    // Filter out undefined and null values
    const validParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value != null)
    ) as Record<string, string | number | boolean>;

    const queryParams = new URLSearchParams();
    Object.entries(validParams).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });

    if (this.apiKey) {
      queryParams.append("apiKey", this.apiKey);
    }

    const url = `${this.baseUrl}${endpoint}${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;

    this.logger.debug({ url: url }, "Making API request");
    const response = await fetch(url, { headers: {} });

    if (!response.ok) {
      this.logger.error(
        {
          status: response.status,
          statusText: response.statusText,
          endpoint,
          params: validParams,
        },
        "API request failed"
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.code !== 0) {
      this.logger.error(
        {
          endpoint,
          params: validParams,
          error: data.message,
        },
        "API returned error"
      );
    }
    this.logger.debug({ endpoint, responseStatus: data.status }, "API request successful");
    return data;
  }
}
