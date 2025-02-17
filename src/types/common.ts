/**
 * @packageDocumentation
 * Common type definitions used across the Conflux Core Scanner SDK.
 * Contains shared types for pagination, block tags, token types, and other common parameters.
 * @module types/common
 */

/**
 * Common pagination parameters used across multiple endpoints.
 * Provides options for skipping records, limiting results, and sorting.
 *
 * @public
 */
export interface PaginationParams {
  /** Page number (1-based) */
  page?: number;
  /** Page offset. */
  offset?: number;
  /** Number of records to skip (pageSize * (pageNumber - 1)). Maximum 10000. */
  skip?: number;
  /** Number of records per page. Maximum 100. */
  limit?: number;
  /** Sort order by timestamp (ASC for ascending, DESC for descending) */
  sort?: "asc" | "desc";
}

/**
 * @public
 * Block tag types used for queries.
 * Specifies the block state to query data from.
 *
 * - latest_mined: Most recently mined block
 * - latest_state: Most recent state
 * - latest_finalized: Most recently finalized block
 * - latest_confirmed: Most recently confirmed block
 * - latest_checkpoint: Most recent checkpoint
 * - earliest: First block in the chain
 *
 */
export type BlockTag =
  | "latest_mined"
  | "latest_state"
  | "latest_finalized"
  | "latest_confirmed"
  | "latest_checkpoint"
  | "earliest";

/**
 * Token types supported by the API.
 * Defines the different token standards available.
 *
 * @public
 */
export type TokenType =
  | "CRC20" // Standard fungible token
  | "CRC721" // Non-fungible token
  | "CRC1155" // Multi-token standard
  | "native"; // Native CFX token

/**
 * Transfer types supported by the API.
 * Defines the different types of transfer operations.
 *
 * @public
 */
export type TransferType =
  | "transaction" // Standard transaction
  | "call" // Contract call
  | "create" // Contract creation
  | "transfer_20" // CRC20 token transfer
  | "transfer_721" // CRC721 token transfer
  | "transfer_1155"; // CRC1155 token transfer

/**
 * Time periods for statistics.
 * Defines the available time ranges for statistical queries.
 *
 * - 24h: Last 24 hours
 * - 3d: Last 3 days
 * - 7d: Last 7 days
 * - 14d: Last 14 days
 * - day: Daily stats
 * - week: Weekly stats
 *
 * @public
 */
export type StatsPeriod = "24h" | "3d" | "7d" | "14d" | "day" | "week";

/**
 * Interval types for statistics.
 * Defines the granularity of statistical data.
 *
 * - min: Per minute
 * - hour: Per hour
 * - day: Per day
 *
 * @public
 */
export type StatsIntervalType = "min" | "hour" | "day";

/**
 * Common timestamp range parameters used across multiple endpoints.
 * Provides options for filtering data by time range.
 *
 * @public
 */
export interface TimestampRangeParams {
  /** Minimum timestamp in seconds */
  minTimestamp?: number;
  /** Maximum timestamp in seconds */
  maxTimestamp?: number;
}

/**
 * Common block range parameters used across multiple endpoints.
 * Provides options for filtering data by block numbers.
 *
 * @public
 */
export interface BlockRangeParams {
  /** Starting block number */
  startBlock?: number;
  /** Ending block number */
  endBlock?: number;
}
