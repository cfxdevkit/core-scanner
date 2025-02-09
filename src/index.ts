// Core functionality
export { CoreApi, CoreScanner } from "./core";

// Wrapper with formatting
export { CoreScannerWrapper } from "./wrapper";

// Formatters
export { NumberFormatter, DateFormatter, ResponseFormatter } from "./formatters";

// Utils
export { AddressValidator } from "./utils";

// Export all types with documentation
/**
 * API related types
 * @public
 */
export type {
  ApiConfig,
  ApiResponse,
  /**
   * Response wrapper type
   * @typeParam T - The raw response type
   * @typeParam F - The formatted response type
   */
  FormattedResponse,
  ConfluxTarget,
} from "./types/api";

/**
 * Core response and data types
 * @public
 */
export type {
  // Contract types
  ContractABIData,
  ContractSourceData,
  ContractABIResponse,
  ContractSourceResponse,

  // Token types
  TokenData,
  TokenListResponse,

  // Stats types
  StatItem,
  /** Core statistics item */
  CoreStatItem,
  ContractStatItem,
  TransferStatItem,
  TpsStatItem,
  TopGasItem,
  TopValueItem,
  /** Top statistics item */
  TopStatsItem,
  /** Top statistics response */
  CoreTopStatsResponse,

  // Response types
  ListResponse,
  MinerItem,
  SupplyResponse,
} from "./types/responses";

/**
 * Parameter types
 * @public
 */
export type { StatsParams, StatsPeriod, TokenType } from "./types/params";
